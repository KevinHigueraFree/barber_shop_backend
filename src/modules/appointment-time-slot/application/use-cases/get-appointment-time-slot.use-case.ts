import { Inject, Injectable } from '@nestjs/common';
import { AppointmentTimeSlot } from '@/modules/appointment-time-slot/domain/entities/appointment-time-slot.entity';
import {
  APPOINTMENT_TIME_SLOT_REPOSITORY,
  type AppointmentTimeSlotRepository,
} from '@/modules/appointment-time-slot/domain/repositories/appointment-time-slot.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetAppointmentTimeSlotUseCase {
  constructor(
    @Inject(APPOINTMENT_TIME_SLOT_REPOSITORY)
    private readonly appointmentTimeSlotRepository: AppointmentTimeSlotRepository,
  ) {}

  async execute(id: number): Promise<AppointmentTimeSlot> {
    const appointmentTimeSlot = await this.appointmentTimeSlotRepository.findById(id);
    if (!appointmentTimeSlot) {
      throw new EntityNotFoundException('AppointmentTimeSlot', id);
    }
    return appointmentTimeSlot;
  }
}
