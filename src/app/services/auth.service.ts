import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/pos/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log(email, password);
    return this.http.post(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  signup(email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { email, password, role }, {
      observe: 'response', 
      withCredentials: true
    });
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }  

  isLoggedIn(): boolean {
    return sessionStorage.getItem('userId') !== null;
  }

  setUserSession(userId: string, role: string): void {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', role);
  }
  
  clearUserSession(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
  }
  
}
