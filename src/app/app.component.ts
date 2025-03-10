import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'POS-Frontend';
  isDarkMode = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.checkSession().subscribe(response => {
      if (!response.isAuthenticated) {
        this.authService.clearUserSession();
        this.router.navigate(['/login']); 
      }
    });
  }

  ngAfterViewInit(): void {
    // Initialize all dropdowns
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(dropdownToggleEl => {
      new bootstrap.Dropdown(dropdownToggleEl);
    });
    
    // Remove the custom event listener for the hamburger menu
    // Bootstrap's data attributes will handle the toggle automatically
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.authService.clearUserSession();
        window.location.href = '/login';
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }
}
