import { Component } from '@angular/core';
import { RegisterService } from '../service/Register.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = ''
  errorMessage: string = '';

  constructor(private registrationService: RegisterService, private router: Router) {}

  ngOnInit(): void {}

  register(): void {
    this.registrationService.register(this.username, this.password, this.email).subscribe(
      (newCustomer) => {
        console.log('Registration successful:', newCustomer);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
