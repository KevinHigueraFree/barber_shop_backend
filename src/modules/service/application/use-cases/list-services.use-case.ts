import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/modules/service/domain/entities/service.entity';
import type { ServiceRepository } from '@/modules/service/domain/repositories/service.repository';
import { SERVICE_REPOSITORY } from '@/modules/service/domain/repositories/service.repository';

@Injectable()
export class ListServicesUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(): Promise<Service[]> {
    return this.serviceRepository.findAll();
  }
}
