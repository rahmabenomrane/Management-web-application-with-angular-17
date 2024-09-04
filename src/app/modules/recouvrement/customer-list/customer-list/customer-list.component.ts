import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [RouterModule, TableModule, TabViewModule, ButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  filtre = [{ entity: "", customerID: "" }]
  entityOptions = []
  clients = []
  totalRecords = 0
  selectedCustomers: any = []
  customerOptions = []
  @ViewChild("table")
  table: any;
  loading: boolean = true
  constructor(private dashboardService: DashboardService) { }

  loadCustomers(event: any, filtre: any = []) {
    //this.blockedDocument = true
    const page = (event.first + event.rows) / event.rows
    const rows = event.rows
    let sortField
    if (event.sortField != null) {
      sortField = event.sortField
    }
    else {
      sortField = ""

    }
    const sortOrder = event.sortOrder == -1 ? "desc" : ""
    /*  if(filtre.length==0){
       filtre = [{period:this.selectedPeriod.value,periodType:this.selectedPeriodType}]
     } */
    this.loading = true;
    this.dashboardService
      .getAllCusomers(page, rows, this.filtre)
      .subscribe((res) => {
        this.clients = res.data.customer
        this.totalRecords = res.data.paginate[0].totalRecords;
        this.loading = false
      });
  }
  customerSearch() {
    this.selectedCustomers.forEach(element => {
      this.filtre[0].customerID = element.customer_id + ','

    });
  }
}
