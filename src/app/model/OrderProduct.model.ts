import { Product } from "./Product.model";

export class OrderProduct {
    constructor(
      public product: Product,
      public quantity: number
    ) {}
  }