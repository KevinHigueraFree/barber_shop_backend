import { Inject, Injectable } from '@nestjs/common';
import { UpdateSchedulingSettingDto } from '@/scheduling-setting/application/dtos/update-scheduling-setting.dto';
import { SchedulingSetting } from '@/scheduling-setting/domain/entities/scheduling-setting.entity';
import { UpdateSchedulingSetting } from '@/scheduling-setting/domain/entities/update-scheduling-setting';
import { SCHEDULING_SETTING_REPOSITORY } from '@/scheduling-setting/domain/repositories/scheduling-setting.repository';
import type { SchedulingSettingRepository } from '@/scheduling-setting/domain/repositories/scheduling-setting.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';
import { SERVICE_REPOSITORY } from '@/service/domain/repositories/service.repository';
import type { ServiceRepository } from '@/service/domain/repositories/service.repository';

@Injectable()
export class UpdateSchedulingSettingUseCase {
  constructor(
    @Inject(SCHEDULING_SETTING_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingRepository,
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(id: number, dto: UpdateSchedulingSettingDto): Promise<SchedulingSetting> {
    const existing = await this.settingsRepository.findFirst();
    if (!existing) {
      throw new EntityNotFoundException(
        'SchedulingSetting',
        'global',
        'Scheduling settings have not been configured yet. Create them first.',
      );
    }

    // The id in the URL must match the existing singleton record.
    if (existing.id !== id) {
      throw new EntityNotFoundException('SchedulingSetting', id);
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
      new UpdateSchedulingSetting(existing.id, slotDurationMinutes),
    );
  }
}
