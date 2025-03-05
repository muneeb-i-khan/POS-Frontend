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
  imports: [
    FormsModule,
    NgIf
  ],
})export class SignupComponent {
  email = '';
  password = '';
  errorMessage: string | null = '';  
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Full response:', response);
        
        if (response.status === 200) {  
          this.successMessage = response.body?.message || 'Signup successful!';
          this.errorMessage = null;
          
          setTimeout(() => {
            console.log('Navigating to login...');
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.errorMessage = 'Unexpected response status';
          this.successMessage = '';
        }
      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          if (typeof err.error === 'object') {
            this.errorMessage = Object.values(err.error).join(' '); 
          } else {
            this.errorMessage = err.error.error || 'Signup failed. Please try again.';
          }
        } else {
          this.errorMessage = 'Signup failed: ' + err.message;
        }
      }
    });
  
  }
}