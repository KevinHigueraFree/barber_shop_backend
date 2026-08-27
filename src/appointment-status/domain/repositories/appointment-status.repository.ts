import type { NewAppointmentStatus } from '@/appointment-status/domain/entities/new-appointment-status';
import type { UpdateAppointmentStatus } from '@/appointment-status/domain/entities/update-appointment-status';
import { AppointmentStatus } from '@/appointment-status/domain/entities/appointment-status.entity';

export interface AppointmentStatusRepository {
  create(newStatus: NewAppointmentStatus): Promise<AppointmentStatus>;
  findById(id: number): Promise<AppointmentStatus | null>;
  findByName(name: string): Promise<AppointmentStatus | null>;
  findAll(): Promise<AppointmentStatus[]>;
  update(updateStatus: UpdateAppointmentStatus): Promise<AppointmentStatus>;
  deleteById(id: number): Promise<AppointmentStatus | null>;
}

export const APPOINTMENT_STATUS_REPOSITORY = 'APPOINTMENT_STATUS_REPOSITORY';
