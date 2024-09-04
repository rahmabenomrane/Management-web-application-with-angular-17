import { Component } from '@angular/core';

export interface IBankData {
  bank: string;
  agency: string;
  rib: string;
  copieRib: string;
  user: string;
}
const bankData: IBankData[] = [
  { bank: 'Banque1',agency: 'Agence1', rib: "00112548", copieRib: 'H', user: 'user1'},
  { bank: 'Banque2',agency: 'Agence2', rib: "00112548", copieRib: 'He', user: 'user2'},
  { bank: 'Banque3', agency: 'Agence3',rib: "00112548", copieRib: 'Li', user: 'user3'},
  { bank: 'Banque4',agency: 'Agence4', rib: "00112548", copieRib: 'Be', user: 'user4'},

];
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {
  displayedColumns: string[] = [ 'bank','agency', 'rib', 'copieRib', 'user'];
  dataSource = bankData;
}
