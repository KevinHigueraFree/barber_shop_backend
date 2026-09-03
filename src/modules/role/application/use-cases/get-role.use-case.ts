import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@/modules/role/domain/entities/role.entity';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '@/modules/role/domain/repositories/role.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: number): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new EntityNotFoundException('role', id);
    }

    return role;
  }
}
