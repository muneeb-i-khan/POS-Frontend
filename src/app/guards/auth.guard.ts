import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkSession().pipe(
      tap(response => {
        if (!response.isAuthenticated) {
          this.authService.clearUserSession();
          this.router.navigate(['/login']);
        }
      }),
      catchError(() => {
        this.authService.clearUserSession();
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
