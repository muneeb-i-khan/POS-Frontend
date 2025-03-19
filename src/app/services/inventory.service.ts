import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Inventory } from '../types/inventory.type';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:9000/pos/api/inventory';
  private inventoryUploadUrl = 'http://localhost:9000/pos/api/inventory/upload';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl, {
      withCredentials: true
     });
  }

  postInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, inventory, {
      withCredentials: true
     });
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true
     });
  }

  updateInventory(id: number, inventory: Partial<Inventory>): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, inventory, {
      withCredentials: true
     });
  }

  uploadInventoryTSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.inventoryUploadUrl, formData, {
      withCredentials: true,
      responseType: 'blob' as 'json' 
    }).pipe(
      map(response => {
        if (response instanceof Blob) {
          const blob = new Blob([response], { type: 'text/tab-separated-values' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'error.tsv';
          link.click();
          window.URL.revokeObjectURL(url);
        }
        return response;
      })
    );
  }

  getInventoriesPaginated(page: number, pageSize: number): Observable<{ inventories: Inventory[], totalInventories: number }> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/paginated?page=${page}&pageSize=${pageSize}`, { 
      observe: 'response',
      withCredentials: true
     })
      .pipe(
        map(response => {
          const totalInventories = Number(response.headers.get('totalInventories')) || 0;
          return { inventories: response.body || [], totalInventories };  
        })
      );
  }
} 
