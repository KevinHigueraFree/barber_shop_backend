export class UpdateUser {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public password: string,
    public roleId: number,
    public isEnabled: boolean,
    public isCustomer: boolean,
    public isStaff: boolean,
  ) {}
}
