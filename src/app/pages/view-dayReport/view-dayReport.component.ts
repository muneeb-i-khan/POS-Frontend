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

    @ViewChild('createClientModal', { static: false }) createClientModal!: ElementRef;

    startDate: string = '';
    endDate: string = '';

    constructor(private daySalesReportService: DaySalesReportService, private router: Router) { }

    ngOnInit() {
        this.loadClients();
    }

    ngAfterViewInit() {
        setTimeout(() => {
        });
    }

    onGenerateReport() {
        this.loadClients();
    }

    loadClients() {
        if (!this.startDate && !this.endDate) {
            this.daySalesReportService.getAllReports().subscribe({
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

    private formatDate(dateObj: any): string {
        if (!dateObj) return '';
        return `${dateObj.year}-${String(dateObj.monthValue).padStart(2, '0')}-${String(dateObj.dayOfMonth).padStart(2, '0')}`;
    }

}
