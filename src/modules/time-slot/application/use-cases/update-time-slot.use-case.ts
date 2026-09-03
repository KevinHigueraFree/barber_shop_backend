import { Inject, Injectable } from '@nestjs/common';
import { SchedulingSettingService } from '@/modules/scheduling-setting/application/services/scheduling-setting.service';
import { UpdateTimeSlotDto } from '@/modules/time-slot/application/dtos/update-time-slot.dto';
import { UpdateTimeSlot } from '@/modules/time-slot/domain/entities/update-time-slot';
import { TimeSlot } from '@/modules/time-slot/domain/entities/time-slot.entity';
import { TIME_SLOT_REPOSITORY } from '@/modules/time-slot/domain/repositories/time-slot.repository';
import type { TimeSlotRepository } from '@/modules/time-slot/domain/repositories/time-slot.repository';
import { TimeSlotRules } from '@/modules/time-slot/domain/services/time-slot-rules';
import {
  ConflictDomainException,
  EntityNotFoundException,
  ValidationException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class UpdateTimeSlotUseCase {
  constructor(
    @Inject(TIME_SLOT_REPOSITORY)
    private readonly timeSlotRepository: TimeSlotRepository,
    private readonly schedulingSettingsService: SchedulingSettingService,
  ) {}

  async execute(id: number, dto: UpdateTimeSlotDto): Promise<TimeSlot> {
    const existing = await this.timeSlotRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('TimeSlot', id);
    }

    const startTime = TimeSlotRules.normalize(dto.startTime ?? existing.startTime);
    const endTime = TimeSlotRules.normalize(dto.endTime ?? existing.endTime);
    if (TimeSlotRules.toMinutes(startTime) >= TimeSlotRules.toMinutes(endTime)) {
      throw new ValidationException('The start time must be earlier than the end time');
    }
    await this.schedulingSettingsService.assertValidSlotRange(
      TimeSlotRules.toMinutes(startTime),
      TimeSlotRules.toMinutes(endTime),
    );

    const duplicate = await this.timeSlotRepository.findByRange(startTime, endTime);
    if (duplicate && duplicate.id !== id) {
      throw new ConflictDomainException('The time slot is already registered');
    }

    const updateTimeSlot = new UpdateTimeSlot(id, startTime, endTime);

    return this.timeSlotRepository.update(updateTimeSlot);
  }
}
