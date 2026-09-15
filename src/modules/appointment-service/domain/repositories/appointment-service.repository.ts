import type { AppointmentService } from '@/modules/appointment-service/domain/entities/appointment-service.entity';
import type { NewAppointmentService } from '@/modules/appointment-service/domain/entities/new-appointment-service';

export interface AppointmentServiceRepository {
  create(appointmentService: NewAppointmentService): Promise<AppointmentService>;
  findById(id: number): Promise<AppointmentService | null>;
  findAll(): Promise<AppointmentService[]>;
  findByAppointmentAndService(
    appointmentId: number,
    serviceId: number,
  ): Promise<AppointmentService | null>;
  deleteById(id: number): Promise<AppointmentService | null>;
}

export const APPOINTMENT_SERVICE_REPOSITORY = 'APPOINTMENT_SERVICE_REPOSITORY';
