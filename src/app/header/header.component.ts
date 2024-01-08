import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/Auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../model/User.model';
import { CartService } from '../service/ShoppingCart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit {
  user = this.authService.user 
  numberOfItems: number = 0;

  constructor(private authService: AuthService, private shoppingCartService: CartService){

  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.shoppingCartService.cart$.subscribe(cart => {
      this.numberOfItems = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    });  
  }

  logout(){
    this.authService.logout()
  }
}
