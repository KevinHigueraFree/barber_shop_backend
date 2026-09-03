export class StaffSchedule {
  constructor(
    public readonly id: number,
    public staffId: number,
    public dayOfWeek: Date,
    public workStartTime: string,
    public workEndTime: string,
    public breakStartTime: string | null,
    public breakEndTime: string | null,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
