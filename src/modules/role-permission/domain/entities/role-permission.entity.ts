export class RolePermission {
  constructor(
    public readonly id: number,
    public roleId: number,
    public permissionId: number,
    public readonly createdAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
