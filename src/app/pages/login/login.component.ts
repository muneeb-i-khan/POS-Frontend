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
      error: (err) => {
        if (err.status === 500 && err.error) {
          // Extract default messages from the error description
          const errorDesc = err.error.errorDescription;
          if (errorDesc) {
            const defaultMessages = errorDesc.match(/default message \[(.*?)\]/g)
              ?.map((msg: string) => msg.replace('default message [', '').replace(']', ''))
              ?.filter((msg: string) => !msg.includes('password') && !msg.includes('email'));

            if (defaultMessages && defaultMessages.length > 0) {
              this.errorMessage = defaultMessages.join('. ');
            } else {
              // Fallback to specific validation messages
              if (errorDesc.includes('Has to be a valid email')) {
                this.errorMessage = 'Please enter a valid email address';
              } else if (errorDesc.includes('Password should be of length greater than 6')) {
                this.errorMessage = 'Password must be at least 6 characters long';
              } else if (errorDesc.includes('Password must contain at least one letter')) {
                this.errorMessage = 'Password must contain at least one letter, one digit, and one special character (@$!%*?&)';
              } else {
                this.errorMessage = 'Invalid email or password';
              }
            }
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        } else if (err.status === 400 && err.error) {
          if (typeof err.error === 'object') {
            this.errorMessage = Object.values(err.error).join(' ');
          } else {
            this.errorMessage = err.error.error || 'Invalid email or password';
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
