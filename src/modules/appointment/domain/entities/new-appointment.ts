export class NewAppointment {
  constructor(
    public date: Date,
    public staffId: number,
    public customerId: number,
    public statusId: number,
  ) {}
}
