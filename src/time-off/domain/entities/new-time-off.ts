export class NewTimeOff {
  constructor(
    public staffId: number,
    public reason: string,
    public startDatetime: Date,
    public endDatetime: Date,
  ) {}
}
