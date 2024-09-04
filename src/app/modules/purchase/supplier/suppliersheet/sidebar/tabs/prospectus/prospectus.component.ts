import { Component } from '@angular/core';


export interface IBankData {
  filename: string;
  desc: string;
  user: string;
}
const bankData: IBankData[] = [
  { filename: 'Banque1',desc: 'Agence1', user: "00112548" },
  { filename: 'Banque2',desc: 'Agence2', user: "00112548"},
  { filename: 'Banque3', desc: 'Agence3',user: "00112548"},
  { filename: 'Banque4',desc: 'Agence4', user: "00112548"},
];
@Component({
  selector: 'app-prospectus',
  templateUrl: './prospectus.component.html',
  styleUrls: ['./prospectus.component.css']
})
export class ProspectusComponent {
  displayedColumns: string[] = [ 'filename','desc', 'user' ];
  dataSource = bankData;
  selectedFile: File | null = null;
  fileName: string | null = null;
  value = 'Clear me';

  onFileSelected(event: any): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.fileName = this.selectedFile.name; 
    }
  }
 
}
