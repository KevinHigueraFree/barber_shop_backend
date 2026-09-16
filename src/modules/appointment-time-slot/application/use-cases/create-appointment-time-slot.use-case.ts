import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentTimeSlotDto } from '@/modules/appointment-time-slot/application/dtos/create-appointment-time-slot.dto';
import { AppointmentTimeSlot } from '@/modules/appointment-time-slot/domain/entities/appointment-time-slot.entity';
import { NewAppointmentTimeSlot } from '@/modules/appointment-time-slot/domain/entities/new-appointment-time-slot';
import {
  APPOINTMENT_TIME_SLOT_REPOSITORY,
  type AppointmentTimeSlotRepository,
} from '@/modules/appointment-time-slot/domain/repositories/appointment-time-slot.repository';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';
import {
  TIME_SLOT_REPOSITORY,
  type TimeSlotRepository,
} from '@/modules/time-slot/domain/repositories/time-slot.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateAppointmentTimeSlotUseCase {
  constructor(
    @Inject(APPOINTMENT_TIME_SLOT_REPOSITORY)
    private readonly appointmentTimeSlotRepository: AppointmentTimeSlotRepository,
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepository,
    @Inject(TIME_SLOT_REPOSITORY)
    private readonly timeSlotRepository: TimeSlotRepository,
  ) {}

  async execute(dto: CreateAppointmentTimeSlotDto): Promise<AppointmentTimeSlot> {
    const [appointment, timeSlot] = await Promise.all([
      this.appointmentRepository.findById(dto.appointmentId),
      this.timeSlotRepository.findById(dto.timeSlotId),
    ]);

    if (!appointment) {
      throw new EntityNotFoundException('Appointment', dto.appointmentId);
    }
    if (!timeSlot) {
      throw new EntityNotFoundException('TimeSlot', dto.timeSlotId);
    }
    if (
      await this.appointmentTimeSlotRepository.findByAppointmentAndTimeSlot(
        dto.appointmentId,
        dto.timeSlotId,
      )
    ) {
      throw new ConflictDomainException(
        `Time slot ${dto.timeSlotId} is already assigned to appointment ${dto.appointmentId}`,
      );
    }

    return this.appointmentTimeSlotRepository.create(
      new NewAppointmentTimeSlot(dto.appointmentId, dto.timeSlotId),
    );
  }
}
