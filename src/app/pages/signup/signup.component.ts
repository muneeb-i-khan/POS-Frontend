import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class SignupComponent {
  email = '';
  password = '';
  errorMessage: string | null = null;  
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.errorMessage = null; 
    this.successMessage = ''; 

    this.authService.signup(this.email, this.password).subscribe({
      next: (response) => {
        
        let message = 'Signup successful! Redirecting to login...';
        if (response) {
          if (typeof response === 'object' && 'message' in response) {
            message = response.message; 
          } else if (typeof response === 'string') {
            message = response; 
          }
        }
        
        this.successMessage = message;
        this.errorMessage = null;

        setTimeout(() => {
          console.log('Navigating to login...');
          this.navigateToLogin();
        }, 1500);
      },
      error: (err) => {
        console.error('Signup error:', err);

        if (err.status === 500 && err.error) {
          const errorDesc = err.error.errorDescription;
          if (errorDesc) {
            const defaultMessages = errorDesc.match(/default message \[(.*?)\]/g)
              ?.map((msg: string) => msg.replace('default message [', '').replace(']', ''))
              ?.filter((msg: string) => !msg.includes('password') && !msg.includes('email'));

            if (defaultMessages && defaultMessages.length > 0) {
              this.errorMessage = defaultMessages.join('. ');
            } else {
              if (errorDesc.includes('Has to be a valid email')) {
                this.errorMessage = 'Please enter a valid email address';
              } else if (errorDesc.includes('Password should be of length greater than 6')) {
                this.errorMessage = 'Password must be at least 6 characters long';
              } else if (errorDesc.includes('Password must contain at least one letter')) {
                this.errorMessage = 'Password must contain at least one letter, one digit, and one special character (@$!%*?&)';
              } else {
                this.errorMessage = 'Invalid email or password format';
              }
            }
          } else {
            this.errorMessage = 'Invalid email or password format';
          }
        } else if (err.status === 400 && err.error) {
          if (typeof err.error === 'object') {
            this.errorMessage = Object.values(err.error).join(' ');
          } else {
            this.errorMessage = err.error.error || 'Signup failed. Please try again.';
          }
        } else {
          this.errorMessage = 'Signup failed: ' + (err.message || 'Unknown error');
        }
        this.successMessage = '';
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}