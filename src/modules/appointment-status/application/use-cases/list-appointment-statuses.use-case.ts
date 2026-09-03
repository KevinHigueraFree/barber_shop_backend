import { Inject, Injectable } from '@nestjs/common';
import { AppointmentStatus } from '@/modules/appointment-status/domain/entities/appointment-status.entity';
import type { AppointmentStatusRepository } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { APPOINTMENT_STATUS_REPOSITORY } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';

@Injectable()
export class ListAppointmentStatusesUseCase {
  constructor(
    @Inject(APPOINTMENT_STATUS_REPOSITORY)
    private readonly appointmentStatusRepository: AppointmentStatusRepository,
  ) {}

  async execute(): Promise<AppointmentStatus[]> {
    return this.appointmentStatusRepository.findAll();
  }
}
