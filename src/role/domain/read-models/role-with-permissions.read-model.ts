export interface PermissionSummary {
  id: number;
  moduleId: number;
  moduleName: string;
  actionId: number;
  actionName: string;
}

export interface RolePermissionSummary {
  id: number;
  permission: PermissionSummary;
}

export interface RoleWithPermissions {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  rolePermissions: RolePermissionSummary[];
}
