export class TimeOff {
  constructor(
    public readonly id: number,
    public staffId: number,
    public reason: string,
    public startDatetime: Date,
    public endDatetime: Date,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date = new Date(),
  ) {}
}
