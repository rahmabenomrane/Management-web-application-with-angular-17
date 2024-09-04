import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-exemple',
  standalone: true,
  imports: [DropdownModule,FormsModule,TranslateModule,CommonModule],
  templateUrl: './exemple.component.html',
  styleUrl: './exemple.component.scss'
})
export class ExempleComponent {

  selectCity: string= '';
  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
}

interface City {
  name: string;
  code: string;
}
