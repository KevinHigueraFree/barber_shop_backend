import { Inject, Injectable } from '@nestjs/common';
import { AppointmentStatus } from '@/modules/appointment-status/domain/entities/appointment-status.entity';
import { UpdateAppointmentStatus } from '@/modules/appointment-status/domain/entities/update-appointment-status';
import type { AppointmentStatusRepository } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { APPOINTMENT_STATUS_REPOSITORY } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { UpdateAppointmentStatusDto } from '@/modules/appointment-status/application/dtos/update-appointment-status.dto';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class UpdateAppointmentStatusUseCase {
  constructor(
    @Inject(APPOINTMENT_STATUS_REPOSITORY)
    private readonly appointmentStatusRepository: AppointmentStatusRepository,
  ) {}

  async execute(id: number, dto: UpdateAppointmentStatusDto): Promise<AppointmentStatus> {
    const existing = await this.appointmentStatusRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('AppointmentStatus', id);
    }

    if (dto.name && dto.name !== existing.name) {
      const nameInUse = await this.appointmentStatusRepository.findByName(dto.name);
      if (nameInUse) {
        throw new ConflictDomainException('The name is already registered');
      }
    }

    const updateStatus = new UpdateAppointmentStatus(
      id,
      dto.name ?? existing.name,
      dto.description ?? existing.description,
      dto.colorCode ?? existing.colorCode,
      dto.isEnabled ?? existing.isEnabled,
    );

    return this.appointmentStatusRepository.update(updateStatus);
  }
}
