import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { Router } from '@angular/router';
import { DaySalesReportService } from '../../services/daySalesReport.service';
import { DaySalesReport } from '../../types/daySalesReport.type';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
    selector: 'app-view-dayReport',
    standalone: true,
    imports: [ViewTableComponent, FormsModule, NgIf],
    templateUrl: './view-dayReport.component.html',
    styleUrls: ['./view-dayReport.component.scss']
})
export class ViewDayReportComponent implements OnInit, AfterViewInit {
    columns = [
        { header: 'Date', field: 'date' },
        { header: 'Order Count', field: 'orderCount' },
        { header: 'Item Sold Count', field: 'itemSoldCount' },
        { header: 'Revenue', field: 'revenue' }
    ];

    data: DaySalesReport[] = [];
    entity: string = 'Day Sales Report';

    startDate: string = '';
    endDate: string = '';
    showError: boolean = false;
    errorMessage: string = '';
    totalItems: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;

    constructor(private daySalesReportService: DaySalesReportService, private router: Router) {}

    ngOnInit() {
        this.loadDayReports();
    }

    ngAfterViewInit() {}

    onGenerateReport() {
        this.loadDayReports();
    }

    loadDayReports(page: number = 0) {
        if (!this.startDate && !this.endDate) {
            this.daySalesReportService.getDailyReportsPaginated(page, this.pageSize).subscribe({
                next: (data) => {
                    this.data = data.reports.map(report => ({
                        ...report,
                        date: this.formatDate(report.date)
                    }));
                    this.totalItems = data.totalReports;
                    this.currentPage = page;
                },
                error: (err) => {
                    this.showError = true;
                    this.errorMessage = err.error.error;
                }
            });
        } else {
            const formattedStartDate = this.startDate ? `${this.startDate}T00:00:00Z` : '';
            const formattedEndDate = this.endDate ? `${this.endDate}T23:59:59Z` : '';

            this.daySalesReportService.getReport(formattedStartDate, formattedEndDate).subscribe({
                next: (data) => {
                    this.data = data.map(report => ({
                        ...report,
                        date: this.formatDate(report.date)
                    }));
                },
                error: (err) => {
                    this.showError = true;
                    this.errorMessage = err.error.error;
                }
            });
        }
    }

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.loadDayReports(page);
    }

    private formatDate(date: any): string {
        if (!date || typeof date !== 'object') return '';
        const year = date.year;
        const month = String(date.monthValue).padStart(2, '0'); 
        const day = String(date.dayOfMonth).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}