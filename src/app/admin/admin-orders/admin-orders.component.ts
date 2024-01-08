import { Component } from '@angular/core';
import { Order } from '../../model/Order.model';
import { OrderService } from '../../service/Order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.less'
})
export class AdminOrdersComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}


  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.fetchOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        //handle error
      }
    );
  }

  removeBraces(value: string): string {
    return value.replace(/[{}]/g, '');
  }
}
