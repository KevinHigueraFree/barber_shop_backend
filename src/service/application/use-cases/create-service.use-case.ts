import { Inject, Injectable } from '@nestjs/common';
import { SERVICE_REPOSITORY } from '@/service/domain/repositories/service.repository';
import type { ServiceRepository } from '@/service/domain/repositories/service.repository';
import { CreateServiceDto } from '@/service/application/dtos/create-service.dto';
import { Service } from '@/service/domain/entities/service.entity';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';
import { NewService } from '@/service/domain/entities/new-service';
import { SchedulingSettingService } from '@/scheduling-setting/application/services/scheduling-setting.service';

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
