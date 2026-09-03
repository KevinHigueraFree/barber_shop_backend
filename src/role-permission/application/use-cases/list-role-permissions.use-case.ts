import { Inject, Injectable } from '@nestjs/common';
import { RolePermission } from '@/role-permission/domain/entities/role-permission.entity';
import {
  ROLE_PERMISSION_REPOSITORY,
  type RolePermissionRepository,
} from '@/role-permission/domain/repositories/role-permission.repository';

@Injectable()
export class ListRolePermissionsUseCase {
  constructor(
    @Inject(ROLE_PERMISSION_REPOSITORY)
    private readonly rolePermissionRepository: RolePermissionRepository,
  ) {}

  async execute(): Promise<RolePermission[]> {
    return this.rolePermissionRepository.findAll();
  }
}
