import { Inject, Injectable } from '@nestjs/common';
import { SCHEDULING_SETTINGS_REPOSITORY } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import type { SchedulingSettingsRepository } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import { SchedulingRules } from '@/scheduling-settings/domain/services/scheduling-rules';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class SchedulingSettingsService {
  constructor(
    @Inject(SCHEDULING_SETTINGS_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingsRepository,
  ) {}

  async getSlotDurationMinutes(): Promise<number> {
    const settings = await this.settingsRepository.findFirst();
    if (!settings) {
      throw new EntityNotFoundException(
        'SchedulingSettings',
        'global',
        'Scheduling settings have not been configured yet. Create them first.',
      );
    }
    return settings.slotDurationMinutes;
  }

  async assertDurationIsMultipleOfSlot(duration: number): Promise<void> {
    const slotMinutes = await this.getSlotDurationMinutes();
    if (!SchedulingRules.isDurationMultipleOf(duration, slotMinutes)) {
      throw new ConflictDomainException(
        `Duration (${duration} min) must be a multiple of the slot duration (${slotMinutes} min)`,
      );
    }
  }

  async assertValidSlotRange(startMinutes: number, endMinutes: number): Promise<void> {
    const slotMinutes = await this.getSlotDurationMinutes();
    if (!SchedulingRules.isValidSlotRange(startMinutes, endMinutes, slotMinutes)) {
      throw new ConflictDomainException(`Time slot range must be exactly ${slotMinutes} minutes`);
    }
  }
}
