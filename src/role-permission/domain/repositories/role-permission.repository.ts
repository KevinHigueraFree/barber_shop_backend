import { NewRolePermission } from '@/role-permission/domain/entities/new-role-permission';
import { RolePermission } from '@/role-permission/domain/entities/role-permission.entity';

export interface RolePermissionRepository {
  create(rolePermission: NewRolePermission): Promise<RolePermission>;
  findById(id: number): Promise<RolePermission | null>;
  findByRoleAndPermission(roleId: number, permissionId: number): Promise<RolePermission | null>;
  findAll(): Promise<RolePermission[]>;
  deleteById(id: number): Promise<RolePermission | null>;
}

export const ROLE_PERMISSION_REPOSITORY = 'ROLE_PERMISSION_REPOSITORY';
