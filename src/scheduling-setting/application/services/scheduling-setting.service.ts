import { Inject, Injectable } from '@nestjs/common';
import { SCHEDULING_SETTING_REPOSITORY } from '@/scheduling-setting/domain/repositories/scheduling-setting.repository';
import type { SchedulingSettingRepository } from '@/scheduling-setting/domain/repositories/scheduling-setting.repository';
import { SchedulingRules } from '@/scheduling-setting/domain/services/scheduling-rules';
import {
  ValidationException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class SchedulingSettingService {
  constructor(
    @Inject(SCHEDULING_SETTING_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingRepository,
  ) {}

  async getSlotDurationMinutes(): Promise<number> {
    const settings = await this.settingsRepository.findFirst();
    if (!settings) {
      throw new EntityNotFoundException(
        'SchedulingSetting',
        'global',
        'Scheduling settings have not been configured yet. Create them first.',
      );
    }
    return settings.slotDurationMinutes;
  }

  async assertDurationIsMultipleOfSlot(duration: number): Promise<void> {
    const slotMinutes = await this.getSlotDurationMinutes();
    if (!SchedulingRules.isDurationMultipleOf(duration, slotMinutes)) {
      throw new ValidationException(
        `Duration (${duration} min) must be a multiple of the slot duration (${slotMinutes} min)`,
      );
    }
  }

  async assertValidSlotRange(startMinutes: number, endMinutes: number): Promise<void> {
    const slotMinutes = await this.getSlotDurationMinutes();
    if (!SchedulingRules.isValidSlotRange(startMinutes, endMinutes, slotMinutes)) {
      throw new ValidationException(`Time slot range must be exactly ${slotMinutes} minutes`);
    }
  }
}
