import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  image: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}
@Component({
  selector: 'supplier-history',
  standalone: true,
  imports: [CommonModule,CardModule, DropdownModule, CalendarModule, InputTextModule, TableModule],
  templateUrl: './supplier-history.component.html',
  styleUrl: './supplier-history.component.css'
})
export class SupplierHistoryComponent {
  customers: Customer[] = [
    {
      id: 1000,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz'
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
      },
      balance: 70663
    }
  ];


  first = 0;

  rows = 10;

  constructor() {}

  ngOnInit() {
  }

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  pageChange(event) {
      this.first = event.first;
      this.rows = event.rows;
  }

  isLastPage(): boolean {
      return this.customers ? this.first === this.customers.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.customers ? this.first === 0 : true;
  }
}
