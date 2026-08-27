import { Inject, Injectable } from '@nestjs/common';
import { TimeSlot } from '@/time-slot/domain/entities/time-slot.entity';
import { TIME_SLOT_REPOSITORY } from '@/time-slot/domain/repositories/time-slot.repository';
import type { TimeSlotRepository } from '@/time-slot/domain/repositories/time-slot.repository';

@Injectable()
export class ListTimeSlotsUseCase {
  constructor(
    @Inject(TIME_SLOT_REPOSITORY)
    private readonly timeSlotRepository: TimeSlotRepository,
  ) {}

  execute(): Promise<TimeSlot[]> {
    return this.timeSlotRepository.findAll();
  }
}
