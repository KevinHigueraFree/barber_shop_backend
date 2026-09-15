export class Appointment {
  constructor(
    public readonly id: number,
    public date: Date,
    public staffId: number,
    public customerId: number,
    public statusId: number,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt?: Date,
  ) {}
}
