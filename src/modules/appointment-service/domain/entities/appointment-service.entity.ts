export class AppointmentService {
  constructor(
    public readonly id: number,
    public appointmentId: number,
    public serviceId: number,
    public priceAtService: number,
    public quantity: number,
    public total: number,
    public readonly createdAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
