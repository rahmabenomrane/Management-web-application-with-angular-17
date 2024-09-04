import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) { }

}
