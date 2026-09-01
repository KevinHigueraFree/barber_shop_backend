export class Permission {
  constructor(
    public readonly id: number,
    public moduleId: number,
    public actionId: number,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
