export class TimeSlot {
  constructor(
    public readonly id: number,
    public startTime: string,
    public endTime: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
