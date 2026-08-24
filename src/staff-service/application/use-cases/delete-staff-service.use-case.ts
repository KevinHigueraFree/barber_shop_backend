import { Inject, Injectable } from '@nestjs/common';
import { StaffService } from '@/staff-service/domain/entities/staff-service.entity';
import type { StaffServiceRepository } from '@/staff-service/domain/repositories/staff-service.repository';
import { STAFF_SERVICE_REPOSITORY } from '@/staff-service/domain/repositories/staff-service.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeleteStaffServiceUseCase {
  constructor(
    @Inject(STAFF_SERVICE_REPOSITORY)
    private readonly staffServiceRepository: StaffServiceRepository,
  ) {}

  async execute(id: number): Promise<StaffService> {
    const staffService = await this.staffServiceRepository.deleteById(id);
    if (!staffService) {
      throw new EntityNotFoundException('StaffService', id);
    }
    return staffService;
  }
}
