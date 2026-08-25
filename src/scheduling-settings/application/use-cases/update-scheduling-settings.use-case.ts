import { Inject, Injectable } from '@nestjs/common';
import { UpdateSchedulingSettingsDto } from '@/scheduling-settings/application/dtos/update-scheduling-settings.dto';
import { SchedulingSettings } from '@/scheduling-settings/domain/entities/scheduling-settings.entity';
import { UpdateSchedulingSettings } from '@/scheduling-settings/domain/entities/update-scheduling-settings';
import { SCHEDULING_SETTINGS_REPOSITORY } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import type { SchedulingSettingsRepository } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';
import { SERVICE_REPOSITORY } from '@/service/domain/repositories/service.repository';
import type { ServiceRepository } from '@/service/domain/repositories/service.repository';

@Injectable()
export class UpdateSchedulingSettingsUseCase {
  constructor(
    @Inject(SCHEDULING_SETTINGS_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingsRepository,
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(id: number, dto: UpdateSchedulingSettingsDto): Promise<SchedulingSettings> {
    const existing = await this.settingsRepository.findFirst();
    if (!existing) {
      throw new EntityNotFoundException(
        'SchedulingSettings',
        'global',
        'Scheduling settings have not been configured yet. Create them first.',
      );
    }

    // The id in the URL must match the existing singleton record.
    if (existing.id !== id) {
      throw new EntityNotFoundException('SchedulingSettings', id);
    }

    // Solo bloquea si realmente están intentando CAMBIAR el valor del intervalo
    const isChangingSlotDuration =
      dto.slotDurationMinutes !== undefined &&
      dto.slotDurationMinutes !== existing.slotDurationMinutes;

    if (isChangingSlotDuration) {
      const hasservices = await this.serviceRepository.existsAny();
      if (hasservices) {
        throw new ConflictDomainException(
          'Cannot change slot duration while services already exist. Delete existing services first.',
        );
      }
    }

    const slotDurationMinutes = dto.slotDurationMinutes ?? existing.slotDurationMinutes;

    return this.settingsRepository.update(
      new UpdateSchedulingSettings(existing.id, slotDurationMinutes),
    );
  }
}
