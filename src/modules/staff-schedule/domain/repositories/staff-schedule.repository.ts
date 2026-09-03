import type { NewStaffSchedule } from '@/modules/staff-schedule/domain/entities/new-staff-schedule';
import type { UpdateStaffSchedule } from '@/modules/staff-schedule/domain/entities/update-staff-schedule';
import { StaffSchedule } from '@/modules/staff-schedule/domain/entities/staff-schedule.entity';

export interface StaffScheduleRepository {
  create(schedule: NewStaffSchedule): Promise<StaffSchedule>;
  findById(id: number): Promise<StaffSchedule | null>;
  findAll(): Promise<StaffSchedule[]>;
  update(schedule: UpdateStaffSchedule): Promise<StaffSchedule>;
  deleteById(id: number): Promise<StaffSchedule | null>;
}

export const STAFF_SCHEDULE_REPOSITORY = 'STAFF_SCHEDULE_REPOSITORY';
