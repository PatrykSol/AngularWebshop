import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductCategory } from '../model/ProductCategory.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private apiUrl = 'http://212.132.66.236:8080/api/v1/productcategory';

  constructor(private http: HttpClient) {}

  fetchProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.apiUrl).pipe(
      map((data) => data),
      catchError((error) => {
        throw error;
      })
    );
  }
}
