class Ticket {
  public destination;
  public price;
  public status;

  constructor(destination: string, price: number, status: string) {
    this.destination = destination;
    this.price = price;
    this.status = status;
  }
}

export default Ticket;