import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';
import { TimeSlot } from '@/modules/time-slot/domain/entities/time-slot.entity';
import { TIME_SLOT_REPOSITORY } from '@/modules/time-slot/domain/repositories/time-slot.repository';
import type { TimeSlotRepository } from '@/modules/time-slot/domain/repositories/time-slot.repository';

@Injectable()
export class GetTimeSlotUseCase {
  constructor(
    @Inject(TIME_SLOT_REPOSITORY)
    private readonly timeSlotRepository: TimeSlotRepository,
  ) {}

  async execute(id: number): Promise<TimeSlot> {
    const timeSlot = await this.timeSlotRepository.findById(id);
    if (!timeSlot) {
      throw new EntityNotFoundException('TimeSlot', id);
    }
    return timeSlot;
  }
}
