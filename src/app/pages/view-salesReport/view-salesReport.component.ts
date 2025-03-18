import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalesReport } from '../../types/salesReport.type';
import { SalesReportService } from '../../services/salesReport.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-view-salesReport', 
    standalone: true,
    imports: [ViewTableComponent, FormsModule, CurrencyPipe, CommonModule, NgIf],
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
    showError: boolean = false;
    errorMessage: string = '';

    totalItems: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;
    private errorTimeout: any;

    constructor(private salesReportService: SalesReportService, private router: Router) { }

    ngOnInit() {
        this.loadSalesReports();
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
        }
    }

    onGenerateReport() {
        this.loadSalesReports();
    }

    loadSalesReports(page: number = 0) {
        this.clearError();
        const formattedStartDate = this.startDate ? `${this.startDate}T00:00:00Z` : '';
        const formattedEndDate = this.endDate ? `${this.endDate}T23:59:59Z` : '';

        if (this.startDate || this.endDate || this.clientName || this.description) {
            this.salesReportService.getReport(formattedStartDate, formattedEndDate, this.clientName, this.description).subscribe({
                next: (data) => {
                    if (this.clientName && !this.description) {
                        const clientMap = new Map<string, SalesReport>();
                        data.forEach(report => {
                            if (report.clientName.toLowerCase().includes(this.clientName.toLowerCase())) {
                                if (clientMap.has(report.clientName)) {
                                    const existing = clientMap.get(report.clientName)!;
                                    existing.quantity += report.quantity;
                                    existing.revenue += report.revenue;
                                } else {
                                    clientMap.set(report.clientName, { ...report });
                                }
                            }
                        });
                        this.data = Array.from(clientMap.values());
                    } else {
                        this.data = data;
                    }
                    const startIndex = page * this.pageSize;
                    const endIndex = startIndex + this.pageSize;
                    this.totalItems = this.data.length;
                    this.data = this.data.slice(startIndex, endIndex);
                    this.currentPage = page;
                },
                error: (err) => {
                    this.showErrorMessage(err.error?.error || 'An error occurred while fetching reports');
                }
            });
        } else {
            this.salesReportService.getSalesReportsPaginated(page, this.pageSize).subscribe({
                next: (data) => {
                    this.data = data.report;
                    this.totalItems = data.totalSalesReport;
                    this.currentPage = page;
                },
                error: (err) => {
                    this.showErrorMessage(err.error?.error || 'An error occurred while fetching reports');
                }
            });
        }
    }

    get totalPages(): number {
        return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    }

    goToPage(page: number) {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.loadSalesReports(page);
        }
    }

    getTotalRevenue(): number {
        return this.data.reduce((sum, report) => sum + report.revenue, 0);
    }

    getTotalQuantity(): number {
        return this.data.reduce((sum, report) => sum + report.quantity, 0);
    }

    private showErrorMessage(message: string) {
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
        }

        this.errorMessage = message;
        this.showError = true;

        this.errorTimeout = setTimeout(() => {
            this.clearError();
        }, 3000);
    }

    private clearError() {
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
            this.errorTimeout = null;
        }
        this.showError = false;
        this.errorMessage = '';
    }
}