import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { Router } from '@angular/router';
import { CreateFormComponent } from '../../components/create-form/create-form.component';
import { DaySalesReportService } from '../../services/daySalesReport.service';
import { DaySalesReport } from '../../models/daySalesReport.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-view-dayReport',
    standalone: true,
    imports: [ViewTableComponent, FormsModule],
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

    totalItems: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;

    constructor(private daySalesReportService: DaySalesReportService, private router: Router) { }

    ngOnInit() {
        this.loadDayReports();
    }

    ngAfterViewInit() {
        setTimeout(() => {
        });
    }

    onGenerateReport() {
        this.loadDayReports();
    }

    // loadDayReports(page: number = 0) {
    //     this.daySalesReportService.getDailyReportsPaginated(page, this.pageSize).subscribe({
    //         next: (response) => {
    //             this.data = response.reports.map(report => ({
    //                 ...report,
    //                 date: this.formatDate(report.date)
    //             }));
    //             this.totalItems = response.totalReports;
    //             this.currentPage = page;
    //         },
    //         error: (error) => {
    //             console.error('Error fetching day reports:', error);
    //         }
    //     });
    // }
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
                error: (error) => {
                    console.error('Error fetching orders:', error);
                }
            });
            return;
        }
        else {
            this.daySalesReportService.getReport(this.startDate, this.endDate).subscribe({
                next: (data) => {
                    this.data = data.map(report => ({
                        ...report,
                        date: this.formatDate(report.date)
                    }));
                },
                error: (error) => {
                    console.error('Error fetching orders:', error);
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

    private formatDate(dateObj: any): string {
        if (!dateObj) return '';
        return `${dateObj.year}-${String(dateObj.monthValue).padStart(2, '0')}-${String(dateObj.dayOfMonth).padStart(2, '0')}`;
    }

}
