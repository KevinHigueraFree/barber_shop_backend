import { Inject, Injectable } from '@nestjs/common';
import { SchedulingSettings } from '@/scheduling-settings/domain/entities/scheduling-settings.entity';
import { SCHEDULING_SETTINGS_REPOSITORY } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import type { SchedulingSettingsRepository } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';

@Injectable()
export class ListSchedulingSettingsUseCase {
  constructor(
    @Inject(SCHEDULING_SETTINGS_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingsRepository,
  ) {}

  async execute(): Promise<SchedulingSettings[]> {
    return this.settingsRepository.findAll();
  }
}
