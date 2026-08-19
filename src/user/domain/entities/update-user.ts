export class UpdateUser {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
  ) {}
}
