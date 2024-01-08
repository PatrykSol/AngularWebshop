// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { User } from '../model/User.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = 'http://localhost:8081';

  private userSubject = new Subject<any>();
  user$ = this.userSubject.asObservable();
  private userRole: string = '';
  user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {
    // Retrieve user from localStorage on service initialization
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.baseURL + '/login', body, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map((user: User) => {
        this.setUser(user);
        localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
      })
    );
  }

  setUser(user: any): void {
    this.user = user;
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.user;
  }

  isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }

  logout(): void {
    this.userRole = '';
    this.user = null;
    localStorage.removeItem('user'); // Remove user from localStorage
    
    // Notify subscribers (components) about the logout
    this.userSubject.next(null);

    this.router.navigate(['/login']);
  }

  getUserRole(): string {
    return this.user ? this.user.role : '';
  }
}
