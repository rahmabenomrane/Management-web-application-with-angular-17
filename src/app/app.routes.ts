import { Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { IframesComponent } from './shared/iframes/iframes.component';
import { InboxComponent } from './core/inbox/inbox.component';
import { ProcessComponent } from './core/process/process.component';
import { StartProcessComponent } from './core/start-process/start-process.component';
import { SuppliersheetComponent } from './modules/purchase/supplier/suppliersheet/suppliersheet.component';
import { DashboardComponent } from './modules/recouvrement/dashboard/dashboard.component';
import { SoldeComponent } from './modules/recouvrement/rapport/solde/solde/solde.component';
import { AgingRetardComponent } from './modules/recouvrement/rapport/aging-retard/aging-retard/aging-retard.component';
import { AgingBalanceComponent } from './modules/recouvrement/rapport/aging-balance/aging-balance/aging-balance.component';
import { RecoveryForecastComponent } from './modules/recouvrement/rapport/recovery-forecast/recovery-forecast/recovery-forecast.component';
import { EvolutionRecoveryDelayComponent } from './modules/recouvrement/rapport/evolution-recovery-delay/evolution-recovery-delay/evolution-recovery-delay.component';
import { EvolutionDelayComponent } from './modules/recouvrement/rapport/evolution-delay/evolution-delay/evolution-delay.component';
import { CustomerListComponent } from './modules/recouvrement/customer-list/customer-list/customer-list.component';
import { ConfigurationComponent } from './modules/recouvrement/configuration/configuration/configuration.component';
import { GestionStatutComponent } from './modules/recouvrement/gestion-statut/gestion-statut/gestion-statut.component';
import { TypeConfigurationComponent } from './modules/recouvrement/typeConfiguration/type-configuration/type-configuration.component';
import { CustomerDetailsComponent } from './modules/recouvrement/customer-details/customer-details/customer-details.component';
import { PlanningComponent } from './modules/recouvrement/planning/planning/planning.component';
import { TestComponentRenderer } from '@angular/core/testing';
import { TestComponent } from './core/test/test.component';
import { ActionHistoryComponent } from './modules/recouvrement/action-history/action-history/action-history.component';
import { SupplierHistoryComponent } from './modules/purchase/supplier/supplierHistory/supplier-history/supplier-history.component';
import { SupplierListComponent } from './modules/purchase/supplier/supplierList/supplier-list.component';
import { SupplierMaintComponent } from './modules/purchase/supplier/supplierMaint/supplier-maint.component';
import { ConfigMfComponent } from './modules/purchase/supplier/config-mf/config-mf.component';
import { ExempleComponent } from './core/exemple/exemple.component';
import { TabComponent } from './core/tab/tab.component';
import { AppdownloadedComponent } from './appdownloaded/appdownloaded.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { GestutiComponent } from './gestuti/gestuti.component';

export const routes: Routes = [
    { path: 'login' , component: LoginComponent, pathMatch: 'full' }, 
    { path: '', component: MainComponent,        
      children: [
        
        { path: 'process', component: ProcessComponent,
          children: [
            { path: 'supplier', component: SuppliersheetComponent },
          ]
        }, 

        { path: 'iframes/:iframeId'     , component: IframesComponent },
        { path: 'inbox'                 , component: InboxComponent },
        { path: 'start-process'         , component: StartProcessComponent },
        { path: 'dashboard'             , component: DashboardComponent },
        { path: 'customer-pay-evolution', component: SoldeComponent },
        { path: 'aging-delay'           , component: AgingRetardComponent },
        { path: 'report-balance-aging'  , component: AgingBalanceComponent }, 
        { path: 'report-cash-forecast'  , component: RecoveryForecastComponent },  
        { path: 'dso-trend'             , component: EvolutionRecoveryDelayComponent },
        { path: 'overdue-trend'         , component: EvolutionDelayComponent },
        { path: 'cust-info'             , component: CustomerListComponent },
        { path: 'configuration'         , component: ConfigurationComponent },
        { path: 'gestionStatut'         , component: GestionStatutComponent },
        { path: 'typeConfiguration'     , component: TypeConfigurationComponent },
        { path: 'cust-info-details'     , component: CustomerDetailsComponent },
        { path: 'planning'              , component: PlanningComponent },
        { path: 'test'                  , component: TestComponent },
        { path: 'actionHistory'         , component: ActionHistoryComponent },
        { path: 'supplierHistory'       , component: SupplierHistoryComponent },
        { path: 'supplierList'          , component: SupplierListComponent },
        { path: 'supplierMaint'         , component: SupplierMaintComponent },
        { path: 'config-mf'             , component: ConfigMfComponent },
        { path: 'exemple'             , component: ExempleComponent},
        { path: 'tab'             , component: TabComponent},
        { path: 'app-appdownloaded'             , component: AppdownloadedComponent},
        { path: 'maintenance'              ,component:MaintenanceComponent },
        { path: 'gestuti'              ,component:GestutiComponent },

      ] 
    },
  ];
