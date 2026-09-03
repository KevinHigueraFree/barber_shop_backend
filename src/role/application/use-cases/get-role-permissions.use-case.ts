import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY, type RoleRepository } from '@/role/domain/repositories/role.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetRolePermissionsUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(roleId: number) {
    const role = await this.roleRepository.findByIdWithPermissions(roleId);
    if (!role) {
      throw new EntityNotFoundException('role', roleId);
    }

    return role;
  }
}
