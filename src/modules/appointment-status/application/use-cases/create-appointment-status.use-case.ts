import { Inject, Injectable } from '@nestjs/common';
import { APPOINTMENT_STATUS_REPOSITORY } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import type { AppointmentStatusRepository } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { CreateAppointmentStatusDto } from '@/modules/appointment-status/application/dtos/create-appointment-status.dto';
import { AppointmentStatus } from '@/modules/appointment-status/domain/entities/appointment-status.entity';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';
import { NewAppointmentStatus } from '@/modules/appointment-status/domain/entities/new-appointment-status';

@Injectable()
export class CreateAppointmentStatusUseCase {
  constructor(
    @Inject(APPOINTMENT_STATUS_REPOSITORY)
    private readonly appointmentStatusRepository: AppointmentStatusRepository,
  ) {}

  async execute(dto: CreateAppointmentStatusDto): Promise<AppointmentStatus> {
    const existing = await this.appointmentStatusRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictDomainException('The name is already registered');
    }

    const newStatus = new NewAppointmentStatus(
      dto.name,
      dto.description ?? null,
      dto.colorCode ?? '#CCCCCC',
      dto.isEnabled ?? true,
    );
    return this.appointmentStatusRepository.create(newStatus);
  }
}
