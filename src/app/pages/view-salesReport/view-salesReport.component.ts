import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { Router } from '@angular/router';
import { DaySalesReportService } from '../../services/daySalesReport.service';
import { FormsModule } from '@angular/forms';
import { SalesReport } from '../../models/salesReport.model';
import { SalesReportService } from '../../services/salesReport.service';

@Component({
    selector: 'app-view-dayReport',
    standalone: true,
    imports: [ViewTableComponent, FormsModule],
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

    constructor(private SalesReportService: SalesReportService, private router: Router) { }

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
        if (!this.startDate && !this.endDate && !this.clientName && !this.description) {
            this.SalesReportService.getAllReports().subscribe({
                next: (data) => {
                    this.data = data.map(report => ({
                        ...report,
                    }));
                },
                error: (error) => {
                    console.error('Error fetching orders:', error);
                }
            });
            return;
        }
        else {
            this.SalesReportService.getReport(this.startDate, this.endDate, this.clientName, this.description).subscribe({
                next: (data) => {
                    this.data = data.map(report => ({
                        ...report,
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
