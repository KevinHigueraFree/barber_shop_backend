import { Inject, Injectable } from '@nestjs/common';
import { CreateStaffServiceDto } from '@/modules/staff-service/application/dtos/create-staff-service.dto';
import { NewStaffService } from '@/modules/staff-service/domain/entities/new-staff-service';
import { StaffService } from '@/modules/staff-service/domain/entities/staff-service.entity';
import type { StaffServiceRepository } from '@/modules/staff-service/domain/repositories/staff-service.repository';
import { STAFF_SERVICE_REPOSITORY } from '@/modules/staff-service/domain/repositories/staff-service.repository';
import type { ServiceRepository } from '@/modules/service/domain/repositories/service.repository';
import { SERVICE_REPOSITORY } from '@/modules/service/domain/repositories/service.repository';
import type { UserRepository } from '@/modules/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/user/domain/repositories/user.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateStaffServiceUseCase {
  constructor(
    @Inject(STAFF_SERVICE_REPOSITORY)
    private readonly staffServiceRepository: StaffServiceRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(dto: CreateStaffServiceDto): Promise<StaffService> {
    if (!(await this.userRepository.findById(dto.staffId))) {
      throw new EntityNotFoundException('User', dto.staffId);
    }
    if (!(await this.serviceRepository.findById(dto.serviceId))) {
      throw new EntityNotFoundException('Service', dto.serviceId);
    }

    return this.staffServiceRepository.create(new NewStaffService(dto.staffId, dto.serviceId));
  }
}
