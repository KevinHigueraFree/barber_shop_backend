import type { AppointmentTimeSlot } from '@/modules/appointment-time-slot/domain/entities/appointment-time-slot.entity';
import type { NewAppointmentTimeSlot } from '@/modules/appointment-time-slot/domain/entities/new-appointment-time-slot';

export interface AppointmentTimeSlotRepository {
  create(appointmentTimeSlot: NewAppointmentTimeSlot): Promise<AppointmentTimeSlot>;
  findById(id: number): Promise<AppointmentTimeSlot | null>;
  findByAppointmentAndTimeSlot(
    appointmentId: number,
    timeSlotId: number,
  ): Promise<AppointmentTimeSlot | null>;
  deleteById(id: number): Promise<AppointmentTimeSlot | null>;
}

export const APPOINTMENT_TIME_SLOT_REPOSITORY = 'APPOINTMENT_TIME_SLOT_REPOSITORY';
