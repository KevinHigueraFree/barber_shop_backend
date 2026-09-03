import { Inject, Injectable } from '@nestjs/common';
import { AppointmentStatus } from '@/modules/appointment-status/domain/entities/appointment-status.entity';
import { APPOINTMENT_STATUS_REPOSITORY } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import type { AppointmentStatusRepository } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetAppointmentStatusUseCase {
  constructor(
    @Inject(APPOINTMENT_STATUS_REPOSITORY)
    private readonly appointmentStatusRepository: AppointmentStatusRepository,
  ) {}

  async execute(id: number): Promise<AppointmentStatus> {
    const status = await this.appointmentStatusRepository.findById(id);
    if (!status) {
      throw new EntityNotFoundException('AppointmentStatus', id);
    }
    return status;
  }
}
