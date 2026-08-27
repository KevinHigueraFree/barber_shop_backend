import { Inject, Injectable } from '@nestjs/common';
import { CreateSchedulingSettingDto } from '@/scheduling-setting/application/dtos/create-scheduling-setting.dto';
import { NewSchedulingSetting } from '@/scheduling-setting/domain/entities/new-scheduling-setting';
import { SchedulingSetting } from '@/scheduling-setting/domain/entities/scheduling-setting.entity';
import { SCHEDULING_SETTING_REPOSITORY } from '@/scheduling-setting/domain/repositories/scheduling-setting.repository';
import type { SchedulingSettingRepository } from '@/scheduling-setting/domain/repositories/scheduling-setting.repository';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateSchedulingSettingUseCase {
  constructor(
    @Inject(SCHEDULING_SETTING_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingRepository,
  ) {}

  async execute(dto: CreateSchedulingSettingDto): Promise<SchedulingSetting> {
    // Business rule: only ONE scheduling configuration can exist (eventually
    // per company). If they are already set, creation is rejected and the
    // caller must use update instead.
    const existing = await this.settingsRepository.findFirst();
    if (existing) {
      throw new ConflictDomainException(
        'Scheduling settings already exist. Only one configuration is allowed. Use update to change it.',
      );
    }

    return this.settingsRepository.create(new NewSchedulingSetting(dto.slotDurationMinutes));
  }
}
