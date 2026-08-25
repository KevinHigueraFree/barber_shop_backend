export class UpdateSchedulingSettings {
  constructor(
    public readonly id: number,
    public slotDurationMinutes: number,
  ) {}
}
