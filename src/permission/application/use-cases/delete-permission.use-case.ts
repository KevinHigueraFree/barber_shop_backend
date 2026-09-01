import { Inject, Injectable } from '@nestjs/common';
import { Permission } from '@/permission/domain/entities/permission.entity';
import {
  PERMISSION_REPOSITORY,
  type PermissionRepository,
} from '@/permission/domain/repositories/permission.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeletePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(id: number): Promise<Permission> {
    const deleted = await this.permissionRepository.deleteById(id);
    if (!deleted) {
      throw new EntityNotFoundException('permission', id);
    }

    return deleted;
  }
}
