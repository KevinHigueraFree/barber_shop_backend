import { Inject, Injectable } from '@nestjs/common';
import { UpdateSchedulingSettingDto } from '@/modules/scheduling-setting/application/dtos/update-scheduling-setting.dto';
import { SchedulingSetting } from '@/modules/scheduling-setting/domain/entities/scheduling-setting.entity';
import { UpdateSchedulingSetting } from '@/modules/scheduling-setting/domain/entities/update-scheduling-setting';
import { SCHEDULING_SETTING_REPOSITORY } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';
import type { SchedulingSettingRepository } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';
import { SERVICE_REPOSITORY } from '@/modules/service/domain/repositories/service.repository';
import type { ServiceRepository } from '@/modules/service/domain/repositories/service.repository';
import { TIME_SLOT_REPOSITORY } from '@/modules/time-slot/domain/repositories/time-slot.repository';
import type { TimeSlotRepository } from '@/modules/time-slot/domain/repositories/time-slot.repository';

@Injectable()
export class UpdateSchedulingSettingUseCase {
  constructor(
    @Inject(SCHEDULING_SETTING_REPOSITORY)
    private readonly settingsRepository: SchedulingSettingRepository,
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
    @Inject(TIME_SLOT_REPOSITORY)
    private readonly timeSlotRepository: TimeSlotRepository,
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
      const hasServices = await this.serviceRepository.existsAny();
      if (hasServices) {
        throw new ConflictDomainException(
          'Cannot change slot duration while services already exist. Delete existing services first.',
        );
      }

      const hasTimeSlots = await this.timeSlotRepository.existsAny();
      if (hasTimeSlots) {
        throw new ConflictDomainException(
          'Cannot change slot duration while time-slot already exist. Delete existing time slots first',
        );
      }
    }
    const slotDurationMinutes = dto.slotDurationMinutes ?? existing.slotDurationMinutes;

    return this.settingsRepository.update(
      new UpdateSchedulingSetting(existing.id, slotDurationMinutes),
    );
  }
}
