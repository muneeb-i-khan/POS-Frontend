import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:9000/pos/api/client';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl, {
      withCredentials: true
     });
  }

  postClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, {
      withCredentials: true
     });
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true
     });
  }

  updateClient(id: number, client: Partial<Client>): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client, {
      withCredentials: true
     });
  }

  getClientsPaginated(page: number, pageSize: number): Observable<{ clients: Client[], totalClients: number }> {
    return this.http.get<Client[]>(`${this.apiUrl}/paginated?page=${page}&pageSize=${pageSize}`, { 
      observe: 'response',
      withCredentials: true
    })
    .pipe(
      map(response => {
        const totalClients = Number(response.headers.get('totalClients'));
        console.log('Total clients:', totalClients, 'Current page:', page);
        return { clients: response.body || [], totalClients };
      })
    );
  }
  
}