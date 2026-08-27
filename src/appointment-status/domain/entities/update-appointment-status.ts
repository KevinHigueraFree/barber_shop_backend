export class UpdateAppointmentStatus {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string | null = null,
    public colorCode?: string,
    public isEnabled?: boolean,
  ) {}
}
