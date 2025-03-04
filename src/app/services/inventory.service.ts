import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:9000/pos/api/inventory';
  private inventoryUploadUrl = 'http://localhost:9000/pos/api/inventory/upload';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  postInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, inventory);
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateInventory(id: number, inventory: Partial<Inventory>): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, inventory);
  }

  uploadInventoryTSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.inventoryUploadUrl, formData);
  }

  getInventoriesPaginated(page: number, pageSize: number): Observable<{ inventories: Inventory[], totalInventories: number }> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/paginated?page=${page}&pageSize=${pageSize}`, { observe: 'response' })
      .pipe(
        map(response => {
          const totalInventories = Number(response.headers.get('totalInventories')) || 0;
          return { inventories: response.body || [], totalInventories };  
        })
      );
  }
} 
