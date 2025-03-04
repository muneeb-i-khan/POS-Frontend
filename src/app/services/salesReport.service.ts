import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface SalesReport {
  clientName: string;
  description: string;
  quantity: number;
  revenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {
  private apiUrl = 'http://localhost:9000/pos/api/report/sale';

  constructor(private http: HttpClient) {}

  getReport(startDate: string, endDate: string, clientName: string, description: string): Observable<SalesReport[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('clientName', clientName)
      .set('description', description);

    return this.http.get<SalesReport[]>(`${this.apiUrl}/filter`, { params });
  }

  getAllReports(): Observable<SalesReport[]> {
    return this.http.get<SalesReport[]>(`${this.apiUrl}/sales/all`);
  }

  getSalesReportsPaginated(page: number, pageSize: number): Observable<{ report: SalesReport[], totalSalesReport: number }> {
    return this.http.get<SalesReport[]>(`${this.apiUrl}/sales/paginated?page=${page}&pageSize=${pageSize}`, { observe: 'response' })
      .pipe(
        map(response => {
          const totalSalesReport = Number(response.headers.get('totalSalesReport')) || 0;
          return { report: response.body || [], totalSalesReport };
        })
      );
  }
}

