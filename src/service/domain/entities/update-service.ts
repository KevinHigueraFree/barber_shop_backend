export class UpdateService {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public price: number = 0,
    public duration: number = 0,
  ) {}
}
