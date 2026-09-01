import { Permission } from '@/permission/domain/entities/permission.entity';
import { NewPermission } from '@/permission/domain/entities/new-permission';

export interface PermissionRepository {
  create(permission: NewPermission): Promise<Permission>;
  findById(id: number): Promise<Permission | null>;
  findByModuleAndAction(moduleId: number, actionId: number): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
  deleteById(id: number): Promise<Permission | null>;
}

export const PERMISSION_REPOSITORY = 'PERMISSION_REPOSITORY';
