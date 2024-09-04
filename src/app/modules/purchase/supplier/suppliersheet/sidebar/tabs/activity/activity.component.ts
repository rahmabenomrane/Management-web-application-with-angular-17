import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';

export interface IBankData {
  section: string;
  agency: string;
  rib: string;
  copieRib: string;
}

const bankData: IBankData[] = [
  { section: 'section 1', agency: 'famille 1', rib: "sous famille 1", copieRib: ' Gamme 1' },
  { section: 'section 2', agency: 'famille 2', rib: "sous famille 2", copieRib: ' Gamme 2' },
  { section: 'section 3', agency: 'famille 3', rib: "sous famille 3", copieRib: ' Gamme 3' },
  
];

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  value: string = 'off';
  checked: boolean = false;
  disabled = false;
  stateOptions: any[] = [{ label: 'Non', value: 'off' }, { label: 'Oui', value: 'on' }];
  color: ThemePalette = 'primary';

  displayedColumns: string[] = ['section', 'agency', 'rib', 'copieRib'];
  dataSource = new MatTableDataSource<IBankData>(bankData);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
