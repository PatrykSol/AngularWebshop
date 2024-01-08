import { Component } from '@angular/core';
import { CartService } from './service/ShoppingCart.service';
import { ProductCategoryService } from './service/ProductCategory.service';
import { OrderService } from './service/Order.service';
import { AuthService } from './service/Auth.service';
import { RegisterService } from './service/Register.service';
import { AuthGuardService } from './service/Auth-guard.service';

@Component({
  selector: 'app-root',
  providers: [CartService, ProductCategoryService, OrderService,AuthService,RegisterService,AuthGuardService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'AngularWebshop';
}


