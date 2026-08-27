import { Inject, Injectable } from '@nestjs/common';
import { StaffSchedule } from '@/staff-schedule/domain/entities/staff-schedule.entity';
import type { StaffScheduleRepository } from '@/staff-schedule/domain/repositories/staff-schedule.repository';
import { STAFF_SCHEDULE_REPOSITORY } from '@/staff-schedule/domain/repositories/staff-schedule.repository';

@Injectable()
export class ListStaffSchedulesUseCase {
  constructor(
    @Inject(STAFF_SCHEDULE_REPOSITORY)
    private readonly scheduleRepository: StaffScheduleRepository,
  ) {}

  async execute(): Promise<StaffSchedule[]> {
    return this.scheduleRepository.findAll();
  }
}
