import { OrderProduct } from "./OrderProduct.model";

export class Order {
  constructor(
    public id: string,
    public userid: string,
    public status: string,
    public order_date: string,
    // public totalAmount: number,
    public orderProducts: OrderProduct[]
  ) {}
}
  