import { Inject, Injectable } from '@nestjs/common';
import { CreateSchedulingSettingsDto } from '@/scheduling-settings/application/dtos/create-scheduling-settings.dto';
import { NewSchedulingSettings } from '@/scheduling-settings/domain/entities/new-scheduling-settings';
import { SchedulingSettings } from '@/scheduling-settings/domain/entities/scheduling-settings.entity';
import { SCHEDULING_SETTINGS_REPOSITORY } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import type { SchedulingSettingsRepository } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateSchedulingSettingsUseCase {
  constructor(
    @Inject(SCHEDULING_SETTINGS_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingsRepository,
  ) {}

  async execute(dto: CreateSchedulingSettingsDto): Promise<SchedulingSettings> {
    // Business rule: only ONE scheduling configuration can exist (eventually
    // per company). If they are already set, creation is rejected and the
    // caller must use update instead.
    const existing = await this.settingsRepository.findFirst();
    if (existing) {
      throw new ConflictDomainException(
        'Scheduling settings already exist. Only one configuration is allowed. Use update to change it.',
      );
    }

    return this.settingsRepository.create(new NewSchedulingSettings(dto.slotDurationMinutes));
  }
}
