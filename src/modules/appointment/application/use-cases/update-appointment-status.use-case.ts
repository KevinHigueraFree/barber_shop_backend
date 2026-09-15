import { Inject, Injectable } from '@nestjs/common';
import { UpdateAppointmentStatusDto } from '@/modules/appointment/application/dtos/update-appointment-status.dto';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';
import {
  APPOINTMENT_STATUS_REPOSITORY,
  type AppointmentStatusRepository,
} from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class UpdateAppointmentStatusUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepository,
    @Inject(APPOINTMENT_STATUS_REPOSITORY)
    private readonly statusRepository: AppointmentStatusRepository,
  ) {}

  async execute(id: number, dto: UpdateAppointmentStatusDto) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new EntityNotFoundException('appointment', id);

    const status = await this.statusRepository.findById(dto.statusId);
    if (!status) throw new EntityNotFoundException('AppointmentStatus', dto.statusId);

    return this.appointmentRepository.updateStatus(id, dto.statusId);
  }
}
