import { Inject, Injectable } from '@nestjs/common';
import { SchedulingSettings } from '@/scheduling-settings/domain/entities/scheduling-settings.entity';
import { SCHEDULING_SETTINGS_REPOSITORY } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import type { SchedulingSettingsRepository } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetSchedulingSettingsByIdUseCase {
  constructor(
    @Inject(SCHEDULING_SETTINGS_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingsRepository,
  ) {}

  async execute(id: number): Promise<SchedulingSettings> {
    const settings = await this.settingsRepository.findById(id);
    if (!settings) {
      throw new EntityNotFoundException('SchedulingSettings', id);
    }
    return settings;
  }
}
