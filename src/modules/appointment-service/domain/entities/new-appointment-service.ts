export class NewAppointmentService {
  constructor(
    public appointmentId: number,
    public serviceId: number,
    public priceAtService: number,
    public quantity: number,
  ) {}

  get total(): number {
    return Number((this.priceAtService * this.quantity).toFixed(2));
  }
}
