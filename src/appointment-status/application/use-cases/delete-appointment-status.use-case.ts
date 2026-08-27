import { Inject, Injectable } from '@nestjs/common';
import { APPOINTMENT_STATUS_REPOSITORY } from '@/appointment-status/domain/repositories/appointment-status.repository';
import type { AppointmentStatusRepository } from '@/appointment-status/domain/repositories/appointment-status.repository';
import { AppointmentStatus } from '@/appointment-status/domain/entities/appointment-status.entity';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeleteAppointmentStatusUseCase {
  constructor(
    @Inject(APPOINTMENT_STATUS_REPOSITORY)
    private readonly appointmentStatusRepository: AppointmentStatusRepository,
  ) {}

  async execute(id: number): Promise<AppointmentStatus> {
    const status = await this.appointmentStatusRepository.deleteById(id);
    if (!status) {
      throw new EntityNotFoundException('AppointmentStatus', id);
    }
    return status;
  }
}
