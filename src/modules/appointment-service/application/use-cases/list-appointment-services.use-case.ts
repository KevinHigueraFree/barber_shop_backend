import { Inject, Injectable } from '@nestjs/common';
import { AppointmentService } from '@/modules/appointment-service/domain/entities/appointment-service.entity';
import {
  APPOINTMENT_SERVICE_REPOSITORY,
  type AppointmentServiceRepository,
} from '@/modules/appointment-service/domain/repositories/appointment-service.repository';

@Injectable()
export class ListAppointmentServicesUseCase {
  constructor(
    @Inject(APPOINTMENT_SERVICE_REPOSITORY)
    private readonly appointmentServiceRepository: AppointmentServiceRepository,
  ) {}

  execute(): Promise<AppointmentService[]> {
    return this.appointmentServiceRepository.findAll();
  }
}
