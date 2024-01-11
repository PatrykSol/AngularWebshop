import { Component } from '@angular/core';
import { Order } from '../../model/Order.model';
import { OrderService } from '../../service/Order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/Auth.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.less'
})
export class AdminOrdersComponent {
  orders: Order[] = [];
  error: string = ''

  constructor(private orderService: OrderService,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    const id = this.authService.getUser()?.id || ''; 

    this.orderService.fetchOrders(id).subscribe(      (data) => {
        this.orders = data;
      },
      (error) => {
        this.error = error
      }
    );
  }

  removeBraces(value: string): string {
    return value.replace(/[{}]/g, '');
  }
}
