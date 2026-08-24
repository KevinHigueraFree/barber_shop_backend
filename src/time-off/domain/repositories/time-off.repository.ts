import type { NewTimeOff } from '@/time-off/domain/entities/new-time-off';
import type { UpdateTimeOff } from '@/time-off/domain/entities/update-time-off';
import { TimeOff } from '@/time-off/domain/entities/time-off.entity';

export interface TimeOffRepository {
  create(time_off: NewTimeOff): Promise<TimeOff>;
  findById(id: number): Promise<TimeOff | null>;
  findAll(): Promise<TimeOff[]>;
  update(time_off: UpdateTimeOff): Promise<TimeOff>;
  deleteById(id: number): Promise<TimeOff | null>;
}

// Dependency injection token (Nest cannot inject interfaces directly)
export const TIME_OFF_REPOSITORY = 'TIME_OFF_REPOSITORY';
