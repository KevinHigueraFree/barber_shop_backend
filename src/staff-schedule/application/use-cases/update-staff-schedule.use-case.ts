import { Inject, Injectable } from '@nestjs/common';
import { UpdateStaffScheduleDto } from '@/staff-schedule/application/dtos/update-staff-schedule.dto';
import { UpdateStaffSchedule } from '@/staff-schedule/domain/entities/update-staff-schedule';
import { StaffSchedule } from '@/staff-schedule/domain/entities/staff-schedule.entity';
import type { StaffScheduleRepository } from '@/staff-schedule/domain/repositories/staff-schedule.repository';
import { STAFF_SCHEDULE_REPOSITORY } from '@/staff-schedule/domain/repositories/staff-schedule.repository';
import type { UserRepository } from '@/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/user/domain/repositories/user.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class UpdateStaffScheduleUseCase {
  constructor(
    @Inject(STAFF_SCHEDULE_REPOSITORY)
    private readonly scheduleRepository: StaffScheduleRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number, dto: UpdateStaffScheduleDto): Promise<StaffSchedule> {
    const existing = await this.scheduleRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('StaffSchedule', id);
    }

    const staffId = dto.staffId ?? existing.staffId;
    if (dto.staffId !== undefined && !(await this.userRepository.findById(staffId))) {
      throw new EntityNotFoundException('User', staffId);
    }

    const workStartTime = dto.workStartTime ?? existing.workStartTime;
    const workEndTime = dto.workEndTime ?? existing.workEndTime;
    const breakStartTime = dto.breakStartTime ?? existing.breakStartTime;
    const breakEndTime = dto.breakEndTime ?? existing.breakEndTime;
    this.validateTimes(
      workStartTime,
      workEndTime,
      breakStartTime ?? undefined,
      breakEndTime ?? undefined,
    );

    return this.scheduleRepository.update(
      new UpdateStaffSchedule(
        id,
        staffId,
        dto.dayOfWeek ?? existing.dayOfWeek,
        workStartTime,
        workEndTime,
        breakStartTime,
        breakEndTime,
      ),
    );
  }

  private validateTimes(
    workStartTime: string,
    workEndTime: string,
    breakStartTime?: string,
    breakEndTime?: string,
  ): void {
    if (workStartTime >= workEndTime) {
      throw new ConflictDomainException(
        'The work start time must be earlier than the work end time',
      );
    }
    if ((breakStartTime && !breakEndTime) || (!breakStartTime && breakEndTime)) {
      throw new ConflictDomainException('Break start and end times must be provided together');
    }
    if (breakStartTime && breakEndTime) {
      if (breakStartTime >= breakEndTime) {
        throw new ConflictDomainException(
          'The break start time must be earlier than the break end time',
        );
      }
      if (breakStartTime < workStartTime || breakEndTime > workEndTime) {
        throw new ConflictDomainException('The break must be within working hours');
      }
    }
  }
}
