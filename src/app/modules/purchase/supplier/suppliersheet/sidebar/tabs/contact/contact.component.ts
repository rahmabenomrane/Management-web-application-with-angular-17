import { Component } from '@angular/core';
export interface IBankData {
  nom: string;
  tel: string;
  fax: string;
  email: string;
  user: string;
}
const bankData: IBankData[] = [
  { nom: 'Mohamed Ben Ahmed', tel: '71-123-456', fax: '71-987-654', email: 'mohamed@example.tn', user: 'mohamed123' },
  { nom: 'Fatima Soussi', tel: '72-234-567', fax: '72-765-432', email: 'fatima@example.tn', user: 'fatima456' },
  { nom: 'Leila Hamdi', tel: '71-456-789', fax: '71-543-210', email: 'leila@example.tn', user: 'leila1234' },
 
];
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  displayedColumns: string[] = [ 'nom','tel', 'fax', 'email', 'user'];
  dataSource = bankData;
}
