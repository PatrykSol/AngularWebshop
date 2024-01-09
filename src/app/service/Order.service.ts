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

  fetchOrders(username: string): Observable<Order[]> {
    const urlWithParams = `${this.apiUrl}?username=${username}`;
    
    return this.http.get<Order[]>(urlWithParams).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  

  getOrderById(id: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  public saveOrder(order: Order) {
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 
    this.http.post(this.apiUrl, order, { headers })
      .subscribe(data => {
        
      });
 }
}
