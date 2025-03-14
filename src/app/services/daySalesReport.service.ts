import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface DaySalesReport {
  id: number;
  date: string;
  orderCount: number;
  itemSoldCount: number;
  revenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class DaySalesReportService {
  private apiUrl = 'http://localhost:9000/pos/api/report/day';

  constructor(private http: HttpClient) {}

  getReport(startDate: string, endDate: string): Observable<DaySalesReport[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<DaySalesReport[]>(`${this.apiUrl}/sales`, { params, withCredentials: true });
  }

  getAllReports(): Observable<DaySalesReport[]> {
    return this.http.get<DaySalesReport[]>(`${this.apiUrl}/sales/all`, {
      withCredentials: true
     });
  }

  generateDailyReport(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/generate`, null, {
      withCredentials: true
     });
  }

  getDailyReportsPaginated(page: number, pageSize: number): Observable<{ reports: DaySalesReport[], totalReports: number }> {
    return this.http.get<DaySalesReport[]>(`${this.apiUrl}/sales/paginated?page=${page}&pageSize=${pageSize}`, { 
      observe: 'response',
      withCredentials: true
     })
      .pipe(
        map(response => {
          const totalReports = Number(response.headers.get('totalReports')) || 0;
          return { reports: response.body || [], totalReports };                        
        })
      );
  }
}

