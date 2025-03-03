import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    
    return this.http.get<DaySalesReport[]>(`${this.apiUrl}/sales`, { params });
  }

  getAllReports(): Observable<DaySalesReport[]> {
    return this.http.get<DaySalesReport[]>(`${this.apiUrl}/sales/all`);
  }

  generateDailyReport(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/generate`, null);
  }

  getDailyReportsPaginated(page: number, pageSize: number): Observable<{ reports: DaySalesReport[], totalReports: number }> {
    return this.http.get<{ reports: DaySalesReport[], totalReports: number }>(
      `${this.apiUrl}/sales/paginated?page=${page}&pageSize=${pageSize}`
    );
  }
}

