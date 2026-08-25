import type { NewSchedulingSettings } from '@/scheduling-settings/domain/entities/new-scheduling-settings';
import type { UpdateSchedulingSettings } from '@/scheduling-settings/domain/entities/update-scheduling-settings';
import { SchedulingSettings } from '@/scheduling-settings/domain/entities/scheduling-settings.entity';

/**
 * Repository for the singleton scheduling settings record.
 *
 * Because only ONE configuration can exist (eventually one per company), the
 * contract exposes `findFirst()` to get the single record, and `findById()` to
 * fetch it by its id (used by the get-by-id endpoint, consistent with the rest
 * of the modules).
 */
export interface SchedulingSettingsRepository {
  create(settings: NewSchedulingSettings): Promise<SchedulingSettings>;
  findFirst(): Promise<SchedulingSettings | null>;
  findAll(): Promise<SchedulingSettings[]>;
  findById(id: number): Promise<SchedulingSettings | null>;
  update(settings: UpdateSchedulingSettings): Promise<SchedulingSettings>;
}

export const SCHEDULING_SETTINGS_REPOSITORY = 'SCHEDULING_SETTINGS_REPOSITORY';
