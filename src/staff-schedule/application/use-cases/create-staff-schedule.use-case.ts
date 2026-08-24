import { Inject, Injectable } from '@nestjs/common';
import { CreateStaffScheduleDto } from '@/staff-schedule/application/dtos/create-staff-schedule.dto';
import { NewStaffSchedule } from '@/staff-schedule/domain/entities/new-staff-schedule';
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
export class CreateStaffScheduleUseCase {
  constructor(
    @Inject(STAFF_SCHEDULE_REPOSITORY)
    private readonly scheduleRepository: StaffScheduleRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateStaffScheduleDto): Promise<StaffSchedule> {
    await this.ensureStaffExists(dto.staffId);
    this.validateTimes(dto.workStartTime, dto.workEndTime, dto.breakStartTime, dto.breakEndTime);

    return this.scheduleRepository.create(
      new NewStaffSchedule(
        dto.staffId,
        dto.dayOfWeek,
        dto.workStartTime,
        dto.workEndTime,
        dto.breakStartTime ?? null,
        dto.breakEndTime ?? null,
      ),
    );
  }

  private async ensureStaffExists(staffId: number): Promise<void> {
    if (!(await this.userRepository.findById(staffId))) {
      throw new EntityNotFoundException('User', staffId);
    }
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
