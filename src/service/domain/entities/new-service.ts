export class NewService {
  constructor(
    public name: string,
    public description?: string,
    public price: number = 0,
    public duration: number = 0,
  ) {}
}
