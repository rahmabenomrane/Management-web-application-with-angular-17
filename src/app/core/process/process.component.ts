import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild   } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule     } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { StepsModule    } from 'primeng/steps';
import { TableModule    } from 'primeng/table';
import { ToastModule    } from 'primeng/toast';

import { ProcessHeaderComponent } from '../process-header/process-header.component';
import { ProcessFooterComponent } from '../process-footer/process-footer.component';
import { ProcessService } from 'src/app/core/services/process.service';
import { StatusBarService } from 'src/app/core/services/status-bar.service';
import { SuppliersheetComponent } from 'src/app/modules/purchase/supplier/suppliersheet/suppliersheet.component';
import { SupplierService } from 'src/app/modules/purchase/supplier-services/supplier.service';


@Component({
  selector   : 'process',
  standalone : true,
  imports    : [FormsModule,RouterModule, RouterOutlet,ToastModule, StepsModule, TableModule, CardModule, StepsModule, PanelModule, ButtonModule, MenuModule, DropdownModule, ProcessHeaderComponent, ProcessFooterComponent ],
  templateUrl: './process.component.html',
  styleUrl   : './process.component.css',

})
export class ProcessComponent {

  @ViewChild(SuppliersheetComponent) supplierSheetComponent: SuppliersheetComponent;

  processId        : string; 
  processRevision  : string; 
  oProcessId       : string; 
  processName      : string; 
  taskName         : string; 

  iframeUrl        : string | null;
  iframeId         : string | null;

  validProcess    : boolean ;

  constructor(private statusBarService: StatusBarService,private processService: ProcessService) {}

  ngOnInit() {
    this.processService.ProcessStatusSubject.subscribe((status: boolean) => {
      this.validProcess = status;
    });
    
    this.processName = this.processService.getProcessName();
    this.taskName    = this.processService.getTaskName();
   
    this.statusBarService.addStatusBarItem('fas fa-edit', this.processName, 'right', () => {
      console.log('New Item Clicked');
    });

    this.statusBarService.addStatusBarItem('fas fa-star', this.taskName, 'right', () => {
      console.log('New Item Clicked');
    }); 
    
    
  }

  checkValidProcess() {    
    this.processService.checkProcessStatus()
  }  

  ngOnDestroy() {
    this.statusBarService.clearStatusBarItems();
  }

}
