export class NewUser {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public roleId: number,
    public isEnabled: boolean = true,
    public isCustomer: boolean = true,
    public isStaff: boolean = false,
  ) {}
}
