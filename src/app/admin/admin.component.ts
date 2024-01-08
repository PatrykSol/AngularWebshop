import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/Order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Order } from '../model/Order.model';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductComponent } from '../product/product.component';
import { Router } from '@angular/router';
import { AuthService } from '../service/Auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,AdminOrdersComponent,ProductComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less',
  providers: []
})
export class AdminComponent {

  constructor(private router: Router,
    private authService: AuthService
    ){

  }

  
  
}
