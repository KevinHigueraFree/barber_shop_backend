export class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public password: string,
    public roleId: number,
    public isEnabled: boolean = true,
    public isCustomer: boolean = true,
    public isStaff: boolean = false,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt?: Date,
  ) {}
}
