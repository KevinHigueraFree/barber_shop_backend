import { Inject, Injectable } from '@nestjs/common';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetAppointmentUseCase {
  constructor(@Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository) {}

  async execute(id: number) {
    const appointment = await this.repository.findById(id);
    if (!appointment) {
      throw new EntityNotFoundException('Appointment', id);
    }
    return appointment;
  }
}
