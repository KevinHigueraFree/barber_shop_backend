export class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public password: string,
    public isAdmin: boolean = false,
    public isEnabled: boolean = true,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt?: Date,
  ) {}
}
