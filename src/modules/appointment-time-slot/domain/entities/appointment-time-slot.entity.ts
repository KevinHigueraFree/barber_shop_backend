export class AppointmentTimeSlot {
  constructor(
    public readonly id: number,
    public appointmentId: number,
    public timeSlotId: number,
    public readonly createdAt: Date = new Date(),
    public deletedAt?: Date,
  ) {}
}
