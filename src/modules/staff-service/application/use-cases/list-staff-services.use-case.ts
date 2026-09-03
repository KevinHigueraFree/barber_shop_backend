import { Inject, Injectable } from '@nestjs/common';
import { StaffService } from '@/modules/staff-service/domain/entities/staff-service.entity';
import type { StaffServiceRepository } from '@/modules/staff-service/domain/repositories/staff-service.repository';
import { STAFF_SERVICE_REPOSITORY } from '@/modules/staff-service/domain/repositories/staff-service.repository';

@Injectable()
export class ListStaffServicesUseCase {
  constructor(
    @Inject(STAFF_SERVICE_REPOSITORY)
    private readonly staffServiceRepository: StaffServiceRepository,
  ) {}

  async execute(): Promise<StaffService[]> {
    return this.staffServiceRepository.findAll();
  }
}
