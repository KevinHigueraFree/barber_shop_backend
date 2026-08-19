export class Service {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public price: number,
    public readonly createdAt: Date = new Date(),
  ) {}
}
