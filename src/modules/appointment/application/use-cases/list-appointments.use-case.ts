import { Inject, Injectable } from '@nestjs/common';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';

@Injectable()
export class ListAppointmentsUseCase {
  constructor(@Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository) {}

  execute() {
    return this.repository.findAll();
  }
}
