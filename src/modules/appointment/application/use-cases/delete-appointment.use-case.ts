import { Inject, Injectable } from '@nestjs/common';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(@Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository) {}

  async execute(id: number) {
    const deleted = await this.repository.deleteById(id);
    if (!deleted) {
      throw new EntityNotFoundException('Appointment', id);
    }
    return deleted;
  }
}
