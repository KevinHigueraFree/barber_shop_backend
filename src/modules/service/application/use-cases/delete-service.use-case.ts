import { Inject, Injectable } from '@nestjs/common';
import { SERVICE_REPOSITORY } from '@/modules/service/domain/repositories/service.repository';
import type { ServiceRepository } from '@/modules/service/domain/repositories/service.repository';
import { Service } from '@/modules/service/domain/entities/service.entity';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeleteServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly ServiceRepository: ServiceRepository,
  ) {}

  async execute(id: number): Promise<Service> {
    const Service = await this.ServiceRepository.deleteById(id);
    if (!Service) {
      throw new EntityNotFoundException('Service', id);
    }
    return Service;
  }
}
