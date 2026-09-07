import type { Appointment } from '@/modules/appointment/domain/entities/appointment.entity';
import type { NewAppointment } from '@/modules/appointment/domain/entities/new-appointment';

export interface AppointmentRepository {
  create(appointment: NewAppointment): Promise<Appointment>;
  findById(id: number): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  updateStatus(id: number, statusId: number): Promise<Appointment>;
  deleteById(id: number): Promise<Appointment | null>;
}

export const APPOINTMENT_REPOSITORY = 'APPOINTMENT_REPOSITORY';
