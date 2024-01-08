import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/Auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {

  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.authService.getUserRole();
  
        const userRole = this.authService.getUserRole();
  
        if (userRole === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
