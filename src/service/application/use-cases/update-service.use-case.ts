import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/service/domain/entities/service.entity';
import { UpdateService } from '@/service/domain/entities/update-service';
import type { ServiceRepository } from '@/service/domain/repositories/service.repository';
import { SERVICE_REPOSITORY } from '@/service/domain/repositories/service.repository';
import { UpdateServiceDto } from '@/service/application/dtos/update-service.dto';
import {
  EntityNotFoundException,
  ConflictDomainException,
} from '@/shared/domain/exceptions/domain.exception';
import { SchedulingSettingsService } from '@/scheduling-settings/application/services/scheduling-settings.service';

@Injectable()
export class UpdateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly ServiceRepository: ServiceRepository,
    private readonly schedulingSettingsService: SchedulingSettingsService,
  ) {}

  async execute(id: number, dto: UpdateServiceDto): Promise<Service> {
    const existing = await this.ServiceRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('Service', id);
    }

    if (dto.name && dto.name !== existing.name) {
      const nameInUse = await this.ServiceRepository.findByName(dto.name);
      if (nameInUse) {
        throw new ConflictDomainException('The name is already registered');
      }
    }

    const duration = dto.duration ?? existing.duration;
    await this.schedulingSettingsService.assertDurationIsMultipleOfSlot(duration);

    const updateService = new UpdateService(
      id,
      dto.name ?? existing.name,
      dto.description ?? existing.description,
      dto.price ?? existing.price,
      dto.duration ?? existing.duration,
    );

    return this.ServiceRepository.update(updateService);
  }
}
