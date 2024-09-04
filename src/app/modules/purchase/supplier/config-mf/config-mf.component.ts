import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { ProcessFooterComponent } from 'src/app/core/process-footer/process-footer.component';

@Component({
  selector: 'config-mf',
  standalone: true,
  imports: [EditorModule, TableModule,CommonModule, ButtonModule,FormsModule, ProcessFooterComponent, CardModule, DropdownModule, StepperModule,InputOtpModule,InputTextModule ],
  templateUrl: './config-mf.component.html',
  styleUrl: './config-mf.component.css'
})
export class ConfigMfComponent {
  cells: { id: number, value: string }[] = [
    { id: 0, value: '' },
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
    { id: 6, value: '' },
    { id: 7, value: '' },
    { id: 8, value: '' },
    { id: 9, value: '' },
    { id: 10, value: '' },
    { id: 11, value: '' },
    { id: 12, value: '' },
  ];
  selectedCellId: number | null = null;
  private nextId: number = 13; // Start from 13 to differentiate from initial inputs

  addInput() {
    this.cells.push({ id: this.nextId++, value: '' });
  }

  onInputChange(event: any, cellId: number) {
    const cell = this.cells.find(cell => cell.id === cellId);
    if (cell) {
      cell.value = event.target.value;
    }
  }

  selectCell(id: number) {
    this.selectedCellId = id;
  }

  deleteSelectedCell() {
    if (this.selectedCellId !== null) {
      this.cells = this.cells.filter(cell => cell.id !== this.selectedCellId);
      this.selectedCellId = null;
    }
  }
}