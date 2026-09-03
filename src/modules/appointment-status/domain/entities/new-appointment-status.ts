export class NewAppointmentStatus {
  constructor(
    public name: string,
    public description: string | null,
    public colorCode: string,
    public isEnabled: boolean = true,
  ) {}
}
