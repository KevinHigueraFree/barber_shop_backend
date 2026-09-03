import type { NewTimeSlot } from '@/modules/time-slot/domain/entities/new-time-slot';
import type { UpdateTimeSlot } from '@/modules/time-slot/domain/entities/update-time-slot';
import { TimeSlot } from '@/modules/time-slot/domain/entities/time-slot.entity';

export interface TimeSlotRepository {
  create(newTimeSlot: NewTimeSlot): Promise<TimeSlot>;
  findById(id: number): Promise<TimeSlot | null>;
  findByRange(startTime: string, endTime: string): Promise<TimeSlot | null>;
  findAll(): Promise<TimeSlot[]>;
  update(updateTimeSlot: UpdateTimeSlot): Promise<TimeSlot>;
  deleteById(id: number): Promise<TimeSlot | null>;
  existsAny(): Promise<boolean>;
}

export const TIME_SLOT_REPOSITORY = 'TIME_SLOT_REPOSITORY';
