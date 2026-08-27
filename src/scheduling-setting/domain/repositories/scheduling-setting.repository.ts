import type { NewSchedulingSetting } from '@/scheduling-setting/domain/entities/new-scheduling-setting';
import type { UpdateSchedulingSetting } from '@/scheduling-setting/domain/entities/update-scheduling-setting';
import { SchedulingSetting } from '@/scheduling-setting/domain/entities/scheduling-setting.entity';

/**
 * Repository for the singleton scheduling settings record.
 *
 * Because only ONE configuration can exist (eventually one per company), the
 * contract exposes `findFirst()` to get the single record, and `findById()` to
 * fetch it by its id (used by the get-by-id endpoint, consistent with the rest
 * of the modules).
 */
export interface SchedulingSettingRepository {
  create(settings: NewSchedulingSetting): Promise<SchedulingSetting>;
  findFirst(): Promise<SchedulingSetting | null>;
  findAll(): Promise<SchedulingSetting[]>;
  findById(id: number): Promise<SchedulingSetting | null>;
  update(settings: UpdateSchedulingSetting): Promise<SchedulingSetting>;
}

export const SCHEDULING_SETTING_REPOSITORY = 'SCHEDULING_SETTING_REPOSITORY';
