import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
@Component({
  selector: 'app-tab',
  standalone: true,
  imports:[ButtonModule,TabMenuModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadTranslations();
    
    // Optional: Subscribe to language changes if you want to update the menu items dynamically when language changes
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  private loadTranslations() {
    this.translate.get(['DASHBOARD', 'TRANSACTIONS', 'PRODUCTS']).subscribe(translations => {
      this.items = [
        { label: translations['DASHBOARD'], icon: 'pi pi-home' },
        { label: translations['TRANSACTIONS'], icon: 'pi pi-chart-line' },
        { label: translations['PRODUCTS'], icon: 'pi pi-list' },
      ];
      this.activeItem = this.items[0];
    });
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
