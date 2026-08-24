import { Inject, Injectable } from '@nestjs/common';
import { StaffSchedule } from '@/staff-schedule/domain/entities/staff-schedule.entity';
import type { StaffScheduleRepository } from '@/staff-schedule/domain/repositories/staff-schedule.repository';
import { STAFF_SCHEDULE_REPOSITORY } from '@/staff-schedule/domain/repositories/staff-schedule.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeleteStaffScheduleUseCase {
  constructor(
    @Inject(STAFF_SCHEDULE_REPOSITORY)
    private readonly scheduleRepository: StaffScheduleRepository,
  ) {}

  async execute(id: number): Promise<StaffSchedule> {
    const schedule = await this.scheduleRepository.deleteById(id);
    if (!schedule) {
      throw new EntityNotFoundException('StaffSchedule', id);
    }
    return schedule;
  }
}
