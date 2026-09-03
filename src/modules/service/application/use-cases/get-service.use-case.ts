import { Service } from '@/modules/service/domain/entities/service.entity';
import { SERVICE_REPOSITORY } from '@/modules/service/domain/repositories/service.repository';
import type { ServiceRepository } from '@/modules/service/domain/repositories/service.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(id: number): Promise<Service> {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new EntityNotFoundException('Service', id);
    }
    return service;
  }
}
