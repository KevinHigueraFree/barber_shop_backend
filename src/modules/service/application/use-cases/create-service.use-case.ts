import { Inject, Injectable } from '@nestjs/common';
import { SERVICE_REPOSITORY } from '@/modules/service/domain/repositories/service.repository';
import type { ServiceRepository } from '@/modules/service/domain/repositories/service.repository';
import { CreateServiceDto } from '@/modules/service/application/dtos/create-service.dto';
import { Service } from '@/modules/service/domain/entities/service.entity';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';
import { NewService } from '@/modules/service/domain/entities/new-service';
import { SchedulingSettingService } from '@/modules/scheduling-setting/application/services/scheduling-setting.service';

@Injectable()
export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
    private readonly schedulingSettingsService: SchedulingSettingService,
  ) {}

  async execute(dto: CreateServiceDto): Promise<Service> {
    const existing = await this.serviceRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictDomainException('The name is already registered');
    }

    await this.schedulingSettingsService.assertDurationIsMultipleOfSlot(dto.duration);

    const newService = new NewService(dto.name, dto.description ?? null, dto.price, dto.duration);
    return this.serviceRepository.create(newService);
  }
}
