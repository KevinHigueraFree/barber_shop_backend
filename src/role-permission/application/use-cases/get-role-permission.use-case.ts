import { Inject, Injectable } from '@nestjs/common';
import { RolePermission } from '@/role-permission/domain/entities/role-permission.entity';
import {
  ROLE_PERMISSION_REPOSITORY,
  type RolePermissionRepository,
} from '@/role-permission/domain/repositories/role-permission.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetRolePermissionUseCase {
  constructor(
    @Inject(ROLE_PERMISSION_REPOSITORY)
    private readonly rolePermissionRepository: RolePermissionRepository,
  ) {}

  async execute(id: number): Promise<RolePermission> {
    const rolePermission = await this.rolePermissionRepository.findById(id);
    if (!rolePermission) {
      throw new EntityNotFoundException('role permission', id);
    }

    return rolePermission;
  }
}
