// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Order } from '../model/Order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://212.132.66.236:8080/api/v1/orders';

  constructor(private http: HttpClient) {}

  fetchOrders(id: string): Observable<Order[]> {
    const urlWithParams = `${this.apiUrl}?id=${id}`;
    
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
