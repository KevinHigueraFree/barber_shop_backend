export class UpdateRole {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string | null,
  ) {}
}
