import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentServiceDto } from '@/modules/appointment-service/application/dtos/create-appointment-service.dto';
import { NewAppointmentService } from '@/modules/appointment-service/domain/entities/new-appointment-service';
import { AppointmentService } from '@/modules/appointment-service/domain/entities/appointment-service.entity';
import {
  APPOINTMENT_SERVICE_REPOSITORY,
  type AppointmentServiceRepository,
} from '@/modules/appointment-service/domain/repositories/appointment-service.repository';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';
import {
  SERVICE_REPOSITORY,
  type ServiceRepository,
} from '@/modules/service/domain/repositories/service.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateAppointmentServiceUseCase {
  constructor(
    @Inject(APPOINTMENT_SERVICE_REPOSITORY)
    private readonly appointmentServiceRepository: AppointmentServiceRepository,
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepository,
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(dto: CreateAppointmentServiceDto): Promise<AppointmentService> {
    if (!(await this.appointmentRepository.findById(dto.appointmentId))) {
      throw new EntityNotFoundException('Appointment', dto.appointmentId);
    }
    if (!(await this.serviceRepository.findById(dto.serviceId))) {
      throw new EntityNotFoundException('Service', dto.serviceId);
    }
    if (
      await this.appointmentServiceRepository.findByAppointmentAndService(
        dto.appointmentId,
        dto.serviceId,
      )
    ) {
      throw new ConflictDomainException(
        `Service ${dto.serviceId} is already assigned to appointment ${dto.appointmentId}`,
      );
    }

    return this.appointmentServiceRepository.create(
      new NewAppointmentService(dto.appointmentId, dto.serviceId, dto.priceAtService, dto.quantity),
    );
  }
}
