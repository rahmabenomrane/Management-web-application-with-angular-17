import { Component, ViewChild , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SortEvent } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutocompleteService } from '../../services/autocomplete.service';

@Component({
  selector: 'action-history',
  standalone: true,
  imports: [ DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule, 
    CommonModule, 
    FormsModule,
    IconFieldModule, 
    InputTextModule, 
    InputIconModule,
    AutoCompleteModule,
    FloatLabelModule,
    MultiSelectModule,],
  templateUrl: './action-history.component.html',
  styleUrl: './action-history.component.css'
})
export class ActionHistoryComponent {

  @ViewChild('dt') dt: Table;

  typeFilter : string = "";
  recFilter  : string = "";
  selectedSp : string = "";
  recovrerOptions = [];
  typeOptions = [];
  specificList = [];
  histories  = [];
  isSorted: boolean = null;
  totalRecords = 0;
  typeList = []
  selectedcustomerType: any[] = []
  customerTypeOptions = []

  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  selectedRecovrer: any[] = []

  selectedRegion: any[] = []
  regionOptions = []
  rangeLabel = []
  customerClassOptions = []
  selectedcustomerClass: any[] = []

  constructor(private autocompleteservice: AutocompleteService) {}
  ngOnInit(){
    this.specificList = [{id: 0, name : "OUI"}, {id: 1, name : "NON"}]
    this.autocompleteservice
      .getRecovrers("")
      .subscribe((data) => {

        this.recovrerOptions = data.data.recovrer
      });
    this.autocompleteservice
      .getCustomerClasses("")
      .subscribe((data) => {
        this.customerClassOptions = data.data.class

      });
    this.autocompleteservice
      .getEntities("")
      .subscribe((data) => {


        this.entityOptions = data.data.entity


      });
    this.autocompleteservice
      .getTypes("")
      .subscribe((data) => {
        this.customerTypeOptions = data.data.type

      });

    this.autocompleteservice
      .getRegion("")
      .subscribe((data) => {
        this.regionOptions = data.data.region

      });
    this.autocompleteservice
      .getCustomersID("")
      .subscribe((data) => {
        this.customerOptions = data.data.customer
      });
  }
  actionSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
        this.isSorted = true;
        this.sortTableData(event);
    } else if (this.isSorted == true) {
        this.isSorted = false;
        this.sortTableData(event);
    } else if (this.isSorted == false) {
        this.isSorted = null;
        this.histories = []; /*[...this.initialValue];*/
        this.dt.reset();
    }
  }
  sortTableData(event) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return event.order * result;
    });
  }
  
  searchEntity(event: any) {
    console.log(event)
    this.autocompleteservice
      .getEntities(event.filter)
      .subscribe((data) => {

        this.entityOptions = data.data.entity
        console.log(this.entityOptions)

        this.selectedEntities.forEach(selected => {
          const found = this.entityOptions.find((element) => element.entityId == selected.entityId);
          if (!found) {
            this.entityOptions.push(selected)
          }

        });

      });
  }



  searchClasses(event: any) {
    this.autocompleteservice
      .getCustomerClasses(event.filter)
      .subscribe((data) => {
        this.customerClassOptions = data.data.class
        this.selectedcustomerClass.forEach(selected => {
          const found = this.customerClassOptions.find((element) => element.classValue == selected.classValue);
          if (!found) {
            this.customerClassOptions.push(selected)
          }

        });
      });
  }

  searchRegion(event: any) {

    this.autocompleteservice
      .getRegion(event.query)
      .subscribe((data) => {
        this.regionOptions = data.data.region

      });
  }
  searchCustomer(event: any) {
    console
    this.autocompleteservice
      .getCustomersID(event.filter)
      .subscribe((data) => {
        this.customerOptions = data.data.customer
        this.selectedCustomers.forEach(selected => {
          const found = this.customerOptions.find((element) => element.customer_id == selected.customer_id);
          if (!found) {
            this.customerOptions.push(selected)
          }

        });
      });
  }
  searchRecovrer(event: any) {
    this.autocompleteservice
      .getRecovrers(event.query)
      .subscribe((data) => {

        this.recovrerOptions = data.data.recovrer
      });
  }
  searchTypes(event: any) {
    this.autocompleteservice
      .getTypes(event.filter)
      .subscribe((data) => {
        this.customerTypeOptions = data.data.type
        this.selectedcustomerType.forEach(selected => {
          const found = this.customerTypeOptions.find((element) => element.typeValue == selected.typeValue);
          if (!found) {
            this.customerTypeOptions.push(selected)
          }

        });
      });

  }
  clearFiltre() {
    this.selectedEntities = []
    this.selectedCustomers = []
    this.selectedRegion = []
    this.selectedcustomerClass = []
    this.selectedRecovrer = []
    this.selectedcustomerType = []
  }

}

