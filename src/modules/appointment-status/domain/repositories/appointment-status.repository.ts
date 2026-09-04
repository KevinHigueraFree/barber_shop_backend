import { AppointmentStatus } from '@/modules/appointment-status/domain/entities/appointment-status.entity';

export interface AppointmentStatusRepository {
  findById(id: number): Promise<AppointmentStatus | null>;
  findAll(): Promise<AppointmentStatus[]>;
}

export const APPOINTMENT_STATUS_REPOSITORY = 'APPOINTMENT_STATUS_REPOSITORY';
