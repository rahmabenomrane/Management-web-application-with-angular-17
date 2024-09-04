import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'activity',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule,TableModule, DropdownModule, CheckboxModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

  @Output() activityStatus = new EventEmitter<boolean>();

  products:any [] = [
    {
      code: "",
      name:"",
      inventoryStatus:"",
      price:"",
    },

  ];

  validActivity = true;
  fabriquant!: string;
  entrepriseCom!: string;
  prestataire!: string;

  mpList            = [{ format: 'Personne morale', code: 'PM' }];


  constructor() {}

  ngOnInit() {}

  checkValidActivity() {
    this.activityStatus.emit(this.validActivity);
    /* console.log(`%cActivity ${this.validActivity ? 'Valide' : 'Invalide'}`, `color: ${this.validActivity ? 'green' : 'red'};`); */
  }
}
