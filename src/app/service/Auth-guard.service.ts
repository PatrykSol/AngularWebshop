import { Injectable } from '@angular/core';
import { AuthService } from './Auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  constructor(private authService: AuthService,private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
