export class NewAppointmentStatus {
  constructor(
    public name: string,
    public description: string,
    public colorCode: string,
    public isEnabled: boolean = true,
  ) {}
}
