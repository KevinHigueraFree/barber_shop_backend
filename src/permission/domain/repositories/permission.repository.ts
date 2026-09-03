import { Permission } from '@/permission/domain/entities/permission.entity';

export interface PermissionRepository {
  findById(id: number): Promise<Permission | null>;
  findByModuleAndAction(moduleId: number, actionId: number): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
}

export const PERMISSION_REPOSITORY = 'PERMISSION_REPOSITORY';
