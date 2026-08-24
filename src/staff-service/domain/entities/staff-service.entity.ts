export class StaffService {
  constructor(
    public readonly id: number,
    public staffId: number,
    public serviceId: number,
    public readonly createdAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}
}
