export class UpdateStaffSchedule {
  constructor(
    public readonly id: number,
    public staffId: number,
    public dayOfWeek: Date,
    public workStartTime: string,
    public workEndTime: string,
    public breakStartTime: string | null,
    public breakEndTime: string | null,
  ) {}
}
