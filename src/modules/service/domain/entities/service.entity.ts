export class Service {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string | null,
    public price: number = 0,
    public duration: number = 0,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
