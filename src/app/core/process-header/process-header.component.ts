import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'process-header',
  standalone: true,
  imports    : [RouterModule, RouterOutlet,FloatLabelModule,DropdownModule,ToastModule, StepsModule, TableModule, CardModule, StepsModule, PanelModule, ButtonModule, MenuModule, DropdownModule ],
  templateUrl: './process-header.component.html',
  styleUrl: './process-header.component.css',

})
export class ProcessHeaderComponent {

constructor() { }
 
}
