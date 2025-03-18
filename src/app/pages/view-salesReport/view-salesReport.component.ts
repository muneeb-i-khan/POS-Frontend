import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalesReport } from '../../types/salesReport.type';
import { SalesReportService } from '../../services/salesReport.service';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-view-dayReport',
    standalone: true,
    imports: [ViewTableComponent, FormsModule, CurrencyPipe],
    templateUrl: './view-salesReport.component.html',
    styleUrls: ['./view-salesReport.component.scss']
})
export class ViewSalesReportComponent implements OnInit, AfterViewInit {
    columns = [
        { header: 'Client Name', field: 'clientName' },
        { header: 'Description', field: 'description' },
        { header: 'Quantity', field: 'quantity' },
        { header: 'Revenue', field: 'revenue' }
    ];

    data: SalesReport[] = [];
    entity: string = 'Sales Report';

    startDate: string = '';
    endDate: string = '';
    clientName: string = '';
    description: string = '';

    totalItems: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;

    constructor(private salesReportService: SalesReportService, private router: Router) { }

    ngOnInit() {
        this.loadSalesReports();
    }

    ngAfterViewInit() {
        setTimeout(() => {});
    }

    onGenerateReport() {
        this.loadSalesReports();
    }

    loadSalesReports(page: number = 0) {
        if (!this.startDate && !this.endDate && !this.clientName && !this.description) {
            this.salesReportService.getSalesReportsPaginated(page, this.pageSize).subscribe({
                next: (data) => {
                    this.data = data.report;
                    this.totalItems = data.totalSalesReport;
                    this.currentPage = page;
                },
                error: (error) => {
                    console.error('Error fetching reports:', error);
                }
            });
            return;
        } else {
            const formattedStartDate = this.startDate ? `${this.startDate}T00:00:00Z` : '';
            const formattedEndDate = this.endDate ? `${this.endDate}T23:59:59Z` : '';

            this.salesReportService.getSalesReportsPaginated(page, this.pageSize).subscribe({
                next: (data) => {
                    let aggregatedData: SalesReport[] = [];

                    if (this.clientName && !this.description) {
                        const clientMap = new Map<string, SalesReport>();
                        data.report.forEach(report => {
                            if (clientMap.has(report.clientName)) {
                                const existing = clientMap.get(report.clientName)!;
                                existing.quantity += report.quantity;
                                existing.revenue += report.revenue;
                            } else {
                                clientMap.set(report.clientName, { ...report });
                            }
                        });
                        aggregatedData = Array.from(clientMap.values());
                    } else {
                        aggregatedData = data.report;
                    }

                    this.data = aggregatedData;
                    this.totalItems = data.totalSalesReport;
                    this.currentPage = page;
                },
                error: (error) => {
                    console.error('Error fetching reports:', error);
                }
            });
        }
    }

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.loadSalesReports(page);
    }

    getTotalRevenue(): number {
        return this.data.reduce((sum, report) => sum + report.revenue, 0);
    }

    getTotalQuantity(): number {
        return this.data.reduce((sum, report) => sum + report.quantity, 0);
    }
}