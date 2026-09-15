import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '@/modules/appointment/domain/entities/appointment.entity';
import { NewAppointment } from '@/modules/appointment/domain/entities/new-appointment';
import {
  APPOINTMENT_REPOSITORY,
  type AppointmentRepository,
} from '@/modules/appointment/domain/repositories/appointment.repository';
import { CreateAppointmentDto } from '@/modules/appointment/application/dtos/create-appointment.dto';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '@/modules/user/domain/repositories/user.repository';
import {
  APPOINTMENT_STATUS_REPOSITORY,
  type AppointmentStatusRepository,
} from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import {
  EntityNotFoundException,
  ValidationException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: AppointmentRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(APPOINTMENT_STATUS_REPOSITORY)
    private readonly statusRepository: AppointmentStatusRepository,
  ) {}

  async execute(dto: CreateAppointmentDto): Promise<Appointment> {
    const [customer, staff, status] = await Promise.all([
      this.userRepository.findById(dto.customerId),
      this.userRepository.findById(dto.staffId),
      this.statusRepository.findById(dto.statusId),
    ]);

    if (!customer) throw new EntityNotFoundException('Customer', dto.customerId);
    if (!staff) throw new EntityNotFoundException('Staff', dto.staffId);
    if (!status) throw new EntityNotFoundException('AppointmentStatus', dto.statusId);

    if (!customer.isCustomer) {
      throw new ValidationException('The customer user must be marked as customer');
    }
    if (!staff.isStaff) {
      throw new ValidationException('The staff user must be marked as staff');
    }
    if (dto.customerId === dto.staffId) {
      throw new ValidationException('Customer and staff must be different users');
    }

    return this.appointmentRepository.create(
      new NewAppointment(dto.date, dto.staffId, dto.customerId, dto.statusId),
    );
  }
}
