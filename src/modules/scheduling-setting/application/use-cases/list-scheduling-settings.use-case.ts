import { Inject, Injectable } from '@nestjs/common';
import { SchedulingSetting } from '@/modules/scheduling-setting/domain/entities/scheduling-setting.entity';
import { SCHEDULING_SETTING_REPOSITORY } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';
import type { SchedulingSettingRepository } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';

@Injectable()
export class ListSchedulingSettingsUseCase {
  constructor(
    @Inject(SCHEDULING_SETTING_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingRepository,
  ) {}

  async execute(): Promise<SchedulingSetting[]> {
    return this.settingsRepository.findAll();
  }
}
