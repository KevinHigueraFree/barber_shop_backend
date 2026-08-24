export class UpdateTimeOff {
  constructor(
    public readonly id: number,
    public staffId: number,
    public reason: string,
    public startDatetime: Date,
    public endDatetime: Date,
  ) {}
}
