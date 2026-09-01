export class Action {
  constructor(
    public readonly id: number,
    public name: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
