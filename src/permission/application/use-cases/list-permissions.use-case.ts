import { Inject, Injectable } from '@nestjs/common';
import { Permission } from '@/permission/domain/entities/permission.entity';
import {
  PERMISSION_REPOSITORY,
  type PermissionRepository,
} from '@/permission/domain/repositories/permission.repository';

@Injectable()
export class ListPermissionsUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }
}
