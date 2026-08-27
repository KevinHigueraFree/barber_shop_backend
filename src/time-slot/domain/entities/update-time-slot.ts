export class UpdateTimeSlot {
  constructor(
    public readonly id: number,
    public readonly startTime: string,
    public readonly endTime: string,
  ) {}
}
