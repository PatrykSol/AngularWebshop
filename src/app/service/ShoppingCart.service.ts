import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/Product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: { item: Product; quantity: number }[] = [];
  public cart$: BehaviorSubject<{ item: Product; quantity: number }[]> = new BehaviorSubject<{ item: Product; quantity: number }[]>([]);
  public itemsInCart: number = 0;

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartState();
    }
  }

  private updateCartState(): void {
    this.itemsInCart = this.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    this.cart$.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addItem(item: Product, amount: number): void {
    const existingItem = this.cart.find((cartItem) => cartItem.item.id === item.id);
    this.itemsInCart++;
  
    if (existingItem) {
      existingItem.quantity += amount;
    } else {
      this.cart.push({ item, quantity: amount });
    }
    this.updateCartState();
  }

  removeItem(item: Product): void {
    const index = this.cart.findIndex((cartItem) => cartItem.item === item);
    this.itemsInCart--
    if (index !== -1) {
      const currentItem = this.cart[index];
      currentItem.quantity--;

      if (currentItem.quantity === 0) {
        this.cart.splice(index, 1);
      }
      this.updateCartState();
    }
  }

  clearCart(): void {
    this.cart = [];
    this.itemsInCart = 0;
    this.cart$.next(this.cart);
  }
}
