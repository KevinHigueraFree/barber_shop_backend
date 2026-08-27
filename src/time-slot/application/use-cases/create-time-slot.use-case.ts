import { Inject, Injectable } from '@nestjs/common';
import { SchedulingSettingService } from '@/scheduling-setting/application/services/scheduling-setting.service';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';
import { CreateTimeSlotDto } from '@/time-slot/application/dtos/create-time-slot.dto';
import { NewTimeSlot } from '@/time-slot/domain/entities/new-time-slot';
import { TimeSlot } from '@/time-slot/domain/entities/time-slot.entity';
import { TIME_SLOT_REPOSITORY } from '@/time-slot/domain/repositories/time-slot.repository';
import type { TimeSlotRepository } from '@/time-slot/domain/repositories/time-slot.repository';
import { TimeSlotRules } from '@/time-slot/domain/services/time-slot-rules';

@Injectable()
export class CreateTimeSlotUseCase {
  constructor(
    @Inject(TIME_SLOT_REPOSITORY)
    private readonly timeSlotRepository: TimeSlotRepository,
    private readonly schedulingSettingsService: SchedulingSettingService,
  ) {}

  async execute(dto: CreateTimeSlotDto): Promise<TimeSlot> {
    const startTime = TimeSlotRules.normalize(dto.startTime);
    const endTime = TimeSlotRules.normalize(dto.endTime);
    await this.validateRange(startTime, endTime);

    const existing = await this.timeSlotRepository.findByRange(startTime, endTime);
    if (existing) {
      throw new ConflictDomainException('The time slot is already registered');
    }

    return this.timeSlotRepository.create(new NewTimeSlot(startTime, endTime));
  }

  private async validateRange(startTime: string, endTime: string): Promise<void> {
    if (TimeSlotRules.toMinutes(startTime) >= TimeSlotRules.toMinutes(endTime)) {
      throw new ConflictDomainException('The start time must be earlier than the end time');
    }
    await this.schedulingSettingsService.assertValidSlotRange(
      TimeSlotRules.toMinutes(startTime),
      TimeSlotRules.toMinutes(endTime),
    );
  }
}
