import { Inject, Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from '@/modules/role-permission/application/dtos/create-role-permission.dto';
import { NewRolePermission } from '@/modules/role-permission/domain/entities/new-role-permission';
import { RolePermission } from '@/modules/role-permission/domain/entities/role-permission.entity';
import {
  ROLE_PERMISSION_REPOSITORY,
  type RolePermissionRepository,
} from '@/modules/role-permission/domain/repositories/role-permission.repository';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '@/modules/role/domain/repositories/role.repository';
import {
  PERMISSION_REPOSITORY,
  type PermissionRepository,
} from '@/modules/permission/domain/repositories/permission.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateRolePermissionUseCase {
  constructor(
    @Inject(ROLE_PERMISSION_REPOSITORY)
    private readonly rolePermissionRepository: RolePermissionRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(dto: CreateRolePermissionDto): Promise<RolePermission> {
    if (!(await this.roleRepository.findById(dto.roleId))) {
      throw new EntityNotFoundException('Role', dto.roleId);
    }

    if (!(await this.permissionRepository.findById(dto.permissionId))) {
      throw new EntityNotFoundException('Permission', dto.permissionId);
    }

    const existing = await this.rolePermissionRepository.findByRoleAndPermission(
      dto.roleId,
      dto.permissionId,
    );
    if (existing) {
      throw new ConflictDomainException('The role permission is already registered');
    }

    return this.rolePermissionRepository.create(
      new NewRolePermission(dto.roleId, dto.permissionId),
    );
  }
}
