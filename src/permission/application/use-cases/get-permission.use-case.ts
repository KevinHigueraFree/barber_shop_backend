import { Inject, Injectable } from '@nestjs/common';
import { Permission } from '@/permission/domain/entities/permission.entity';
import {
  PERMISSION_REPOSITORY,
  type PermissionRepository,
} from '@/permission/domain/repositories/permission.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetPermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new EntityNotFoundException('permission', id);
    }

    return permission;
  }
}
