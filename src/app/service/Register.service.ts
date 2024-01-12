import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseURL: string = 'http://212.132.66.236:80';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string): Observable<User> {
    const body = { username, password,email };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.baseURL + '/create-account', body, { headers }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}