/**
 * Domain entity representing an appointment status catalog value.
 */
export class AppointmentStatus {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string | null,
    public colorCode: string,
    public isEnabled: boolean,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
