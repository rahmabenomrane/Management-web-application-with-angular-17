import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { AppBarComponent } from '../appbar/appbar.component';
import { RouterModule, Routes } from '@angular/router';
import { MenubarComponent } from '../menubar/menubar.component';
import { ContentComponent } from '../content/content.component';
import { SuppliersheetComponent } from '../../modules/purchase/supplier/suppliersheet/suppliersheet.component';
import { ApptabsComponent } from '../apptabs/apptabs.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule } from '@angular/forms';
import { UserMaintComponent } from '../user-maint/user-maint.component';
import { MaintenanceComponent } from 'src/app/maintenance/maintenance.component';
import { GestutiComponent } from 'src/app/gestuti/gestuti.component';

const routes: Routes = [
];

@NgModule({
  declarations: [
    UserMaintComponent,
    BodyComponent,
    AppBarComponent,
    MenubarComponent,
    SuppliersheetComponent,
    ContentComponent,
    ApptabsComponent,
    MaintenanceComponent,
    GestutiComponent
    
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule, 
    PanelMenuModule, 

  ],
  exports: [BodyComponent]
})

export class BodyModule { 
}
