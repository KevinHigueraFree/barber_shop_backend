import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';
import { TimeSlot } from '@/time-slot/domain/entities/time-slot.entity';
import { TIME_SLOT_REPOSITORY } from '@/time-slot/domain/repositories/time-slot.repository';
import type { TimeSlotRepository } from '@/time-slot/domain/repositories/time-slot.repository';

@Injectable()
export class DeleteTimeSlotUseCase {
  constructor(
    @Inject(TIME_SLOT_REPOSITORY)
    private readonly timeSlotRepository: TimeSlotRepository,
  ) {}

  async execute(id: number): Promise<TimeSlot> {
    const deleted = await this.timeSlotRepository.deleteById(id);
    if (!deleted) {
      throw new EntityNotFoundException('TimeSlot', id);
    }
    return deleted;
  }
}
