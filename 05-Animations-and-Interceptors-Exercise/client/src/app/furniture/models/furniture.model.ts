export class Furniture {
  constructor(
    public id: string,
    public make: string,
    public model: string,
    public year: number,
    public descriptrion: string,
    public price: number,
    public matarial?: string
  ) { }
}
