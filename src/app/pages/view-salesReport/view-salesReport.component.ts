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

    totalItems: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;

    constructor(private SalesReportService: SalesReportService, private router: Router) { }

    ngOnInit() {
        this.loadSalesReports();
    }

    ngAfterViewInit() {
        setTimeout(() => {
        });
    }

    onGenerateReport() {
        this.loadSalesReports();
    }


    loadSalesReports(page: number = 0) {
        if (!this.startDate && !this.endDate && !this.clientName && !this.description) {
            this.SalesReportService.getAllReports().subscribe({
                next: (data) => {
                    this.data = data.map(report => ({
                        ...report,
                    }));
                    this.totalItems = data.length;
                    this.currentPage = page;
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
                    let aggregatedData: SalesReport[] = [];
                    
                    if (this.clientName) {
                        const clientMap = new Map<string, SalesReport>();
                        
                        data.forEach(report => {
                            if (clientMap.has(report.clientName)) {
                                const existing = clientMap.get(report.clientName)!;
                                existing.quantity += report.quantity;
                                existing.revenue += report.revenue;
                            } else {
                                clientMap.set(report.clientName, {...report});
                            }
                        });
                        
                        aggregatedData = Array.from(clientMap.values());
                    } 
                    else if (this.description) {
                        const descMap = new Map<string, SalesReport>();
                        
                        data.forEach(report => {
                            if (descMap.has(report.description)) {
                                const existing = descMap.get(report.description)!;
                                existing.quantity += report.quantity;
                                existing.revenue += report.revenue;
                            } else {
                                descMap.set(report.description, {...report});
                            }
                        });
                        
                        aggregatedData = Array.from(descMap.values());
                    } 
                    else {
                        aggregatedData = data;
                    }
                    
                    this.data = aggregatedData;
                    this.totalItems = aggregatedData.length;
                    this.currentPage = page;
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
        this.loadSalesReports(page);
    }

    private formatDate(dateObj: any): string {
        if (!dateObj) return '';
        return `${dateObj.year}-${String(dateObj.monthValue).padStart(2, '0')}-${String(dateObj.dayOfMonth).padStart(2, '0')}`;
    }

}
