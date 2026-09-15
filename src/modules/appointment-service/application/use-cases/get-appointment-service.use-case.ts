import { Inject, Injectable } from '@nestjs/common';
import { AppointmentService } from '@/modules/appointment-service/domain/entities/appointment-service.entity';
import {
  APPOINTMENT_SERVICE_REPOSITORY,
  type AppointmentServiceRepository,
} from '@/modules/appointment-service/domain/repositories/appointment-service.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetAppointmentServiceUseCase {
  constructor(
    @Inject(APPOINTMENT_SERVICE_REPOSITORY)
    private readonly appointmentServiceRepository: AppointmentServiceRepository,
  ) {}

  async execute(id: number): Promise<AppointmentService> {
    const appointmentService = await this.appointmentServiceRepository.findById(id);
    if (!appointmentService) {
      throw new EntityNotFoundException('AppointmentService', id);
    }
    return appointmentService;
  }
}
