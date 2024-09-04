import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'maint-prospectus',
  standalone: true,
  imports: [TableModule, CommonModule, FileUploadModule],
  templateUrl: './prospectus.component.html',
  styleUrl: './prospectus.component.css'
})
export class ProspectusComponent {

  @Output() prospectusStatus = new EventEmitter<boolean>();

  validProspectus = true;

  data = [
    {
      id: 1,
      name: "",
      desc: 'Prospectus',
      added: '',
    },
    {
      id: 2,
      name: "",
      desc: 'Catalogue',
      added: '',
    },
  ];

  checkValidProspectus() {
    this.prospectusStatus.emit(this.validProspectus);
    /* console.log(`%cProspectus ${this.validProspectus ? 'Valide' : 'Invalide'}`, `color: ${this.validProspectus ? 'green' : 'red'};`); */
  }
}
