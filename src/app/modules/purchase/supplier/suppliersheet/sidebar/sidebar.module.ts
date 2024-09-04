import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { TabsComponent } from './tabs/tabs.component';
import { PaymentComponent } from './tabs/payment/payment.component';
import { TaxeComponent } from './tabs/taxe/taxe.component';
import { BankComponent } from './tabs/bank/bank.component';
import { AdresseComponent } from './tabs/adresse/adresse.component';
import { ContactComponent } from './tabs/contact/contact.component';
import { ProspectusComponent } from './tabs/prospectus/prospectus.component';
import { ActivityComponent } from './tabs/activity/activity.component';
import { QualityComponent } from './tabs/quality/quality.component';
import { MatriculeComponent } from './tabs/matricule/matricule.component';
import { AppModule } from 'src/app/app.module';


@NgModule({
  declarations: [SidebarComponent,  TabsComponent, PaymentComponent, TaxeComponent, BankComponent, AdresseComponent, ContactComponent, ProspectusComponent, ActivityComponent, QualityComponent, MatriculeComponent],
  imports: [
    CommonModule,
    AppModule,
    FormsModule,
    ReactiveFormsModule,
],
  exports: [SidebarComponent]
})
export class SidebarModule { }
