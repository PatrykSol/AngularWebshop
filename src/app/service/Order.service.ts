// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Order } from '../model/Order.model';
import { OrderProduct } from '../model/OrderProduct.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/api/v1/orders';

  constructor(private http: HttpClient) {}

  fetchOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  

  getOrderById(id: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  // saveOrder(order: Order): Observable<Order> {
  //   return this.http.post<Order>(this.apiUrl, order).pipe(
  //     catchError((error) => {
  //       console.error('Error saving order:', error);
  //       throw error;
  //     })
  //   );
  // }


  public saveOrder(order: Order) {
    console.log('Order to be sent:', order);
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 
    this.http.post(this.apiUrl, order, { headers })
      .subscribe(data => {
        console.log(data);
      });
 }
 

//  public createOrder(data: OrderProduct[], customer: string): void {
//   const order: Order = new Order('TestId', 'Product order', customer, data, '');
//   console.log("Data: " + data)
//   this.saveOrder(order);
// }
}
