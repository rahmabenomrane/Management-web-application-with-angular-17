import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'quality',
  standalone: true,
  imports: [CalendarModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './quality.component.html',
  styleUrl: './quality.component.css'
})
export class QualityComponent {

  @Output() qualityStatus = new EventEmitter<boolean>();

  date1: Date | undefined;
  validQuality = true;

  constructor() {}

  ngOnInit() {}

  checkValidQuality() {
    this.qualityStatus.emit(this.validQuality);
    /* console.log(`%cQuality ${this.validQuality ? 'Valide' : 'Invalide'}`, `color: ${this.validQuality ? 'green' : 'red'};`); */
  }
}
