// shopping-cart.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../service/ShoppingCart.service';
import { Product } from '../model/Product.model';
import { Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../model/Order.model';
import { OrderService } from '../service/Order.service';
import { AuthService } from '../service/Auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers: [],
  styleUrl: './shopping-cart.component.less'
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { item: Product; quantity: number }[] = [];
  private subscribe: Subscription;
  totalPrice: number = 0;
  formSubmitted: boolean = false;
  @ViewChild('checkoutForm') checkoutForm: any;
  user = this.authService.user

  constructor(
    private cartService: CartService,
    private location: Location,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.subscribe = this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
      this.calculateTotalPrice();
    });
  }

  ngOnInit(): void {
    this.calculateTotalPrice();
  }

  removeItem(item: Product): void {
    this.cartService.removeItem(item);
  }

  addItem(item: Product): void {
    this.cartService.addItem(item, 1);
  }

  private calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  }

  goBack(): void {
    this.location.back();
  }

  submitForm(form: any): void {
    if (this.checkoutForm.valid) {
    this.placeOrder()
    }
  }

  placeOrder() {
      const currentDate = new Date().toISOString().split('T')[0];

      const newOrder: Order = {
        id: '',
        userid: '',
        order_date: currentDate,
        status: 'Processing',
        orderProducts: this.cartItems.map((cartItem) => ({
          product: cartItem.item,
          quantity: cartItem.quantity
        }))
      };
  
      this.orderService.saveOrder(newOrder);
      this.cartService.clearCart();
      alert('Order placed sucessfully.');

      setTimeout(() => {
        this.location.back();
      }, 1500); 
  }  
}