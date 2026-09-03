import { Inject, Injectable } from '@nestjs/common';
import { SchedulingSetting } from '@/modules/scheduling-setting/domain/entities/scheduling-setting.entity';
import { SCHEDULING_SETTING_REPOSITORY } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';
import type { SchedulingSettingRepository } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetSchedulingSettingByIdUseCase {
  constructor(
    @Inject(SCHEDULING_SETTING_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingRepository,
  ) {}

  async execute(id: number): Promise<SchedulingSetting> {
    const settings = await this.settingsRepository.findById(id);
    if (!settings) {
      throw new EntityNotFoundException('SchedulingSetting', id);
    }
    return settings;
  }
}
