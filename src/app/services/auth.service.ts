import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/pos/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers, withCredentials: true }).pipe(
      tap((response: any) => {
        this.setUserSession(email, response.userId, response.role);
      })
    );
  }

  signup(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(`${this.apiUrl}/signup`, body.toString(), { headers, withCredentials: true });
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.clearUserSession())
    );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('userId') !== null;
  }

  setUserSession(email: string, userId: string, role: string): void {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', role);
  }

  clearUserSession(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
  }

  getUserEmail(): string {
    return sessionStorage.getItem('email') || 'User';
  }
}
