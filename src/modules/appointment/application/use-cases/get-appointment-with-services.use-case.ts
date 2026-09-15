import { Inject, Injectable } from '@nestjs/common';

import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';

@Injectable()
export class GetAppointmentWithServiceUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(appointmentId: number) {
    const appointment = await this.appointmentRepository.findByIdWithServices(appointmentId);
    if (!appointment) {
      throw new EntityNotFoundException('Appointment', appointmentId);
    }

    return appointment;
  }
}
