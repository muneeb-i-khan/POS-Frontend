import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Attempting login with:', this.email, this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response && response.id) {
          this.authService.setUserSession(this.email, response.id.toString(), response.role);
          this.router.navigate(['/app']); 
        } else {
          this.errorMessage = 'Invalid response from server';
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password';
      },
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
