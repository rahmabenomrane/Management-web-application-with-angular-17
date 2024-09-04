import { CommonModule         } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule          } from '@angular/forms';
import { CardModule           } from 'primeng/card';
import { DropdownModule       } from 'primeng/dropdown';
import { InputTextModule      } from 'primeng/inputtext';
import { PanelModule          } from 'primeng/panel';
import { TabViewModule        } from 'primeng/tabview';
import { ToggleButtonModule   } from 'primeng/togglebutton';
import { PaymentComponent     } from './tabs/payment/payment.component';
import { TaxeComponent        } from './tabs/taxe/taxe.component';
import { BankComponent        } from './tabs/bank/bank.component';
import { ActivityComponent    } from './tabs/activity/activity.component';
import { ProspectusComponent  } from './tabs/prospectus/prospectus.component';
import { QualityComponent     } from './tabs/quality/quality.component';
import { LayoutService        } from 'src/app/core/services/layout.service';
import { ProcessService       } from 'src/app/core/services/process.service';
import { SupplierService      } from '../../supplier-services/supplier.service';
import { ToastModule          } from 'primeng/toast';
import { MessageService       } from 'primeng/api';
import { TagModule            } from 'primeng/tag';
import { ButtonModule         } from 'primeng/button';
import { ContactComponent     } from './tabs/contact/contact.component';
import { SidebarModule        } from 'primeng/sidebar';
import { AdresseComponent     } from './tabs/adresse/adresse.component';

@Component({
  selector   : 'supplier-sheet',
  standalone : true,
  templateUrl: './suppliersheet.component.html',
  styleUrls  : ['./suppliersheet.component.css'],
  imports    : [
                ActivityComponent,
                AdresseComponent, 
                ButtonModule,
                BankComponent, 
                CommonModule,
                CardModule, 
                ContactComponent, 
                DropdownModule, 
                FormsModule,
                InputTextModule, 
                SidebarModule, 
                ToggleButtonModule, 
                TabViewModule, 
                ToastModule,
                TagModule,
                TaxeComponent, 
                ToggleButtonModule,
                PanelModule,
                PaymentComponent ,
                ProspectusComponent, 
                QualityComponent, 
               ],
  providers  : [MessageService]

})
export class SuppliersheetComponent {

  @ViewChild(PaymentComponent) paymentComponent : PaymentComponent;
  @ViewChild(TaxeComponent) taxeComponent : TaxeComponent;
  @ViewChild(BankComponent) bankComponent : BankComponent;
  @ViewChild(ContactComponent) contactComponent : ContactComponent;
  @ViewChild(ProspectusComponent) prospectusComponent: ProspectusComponent;
  @ViewChild(ActivityComponent) activityComponent : ActivityComponent;
  @ViewChild(QualityComponent) qualityComponent : QualityComponent;
  @ViewChild(AdresseComponent) adresseComponent : AdresseComponent;

  status = {
    payment   : false,
    taxe      : false,
    bank      : false,
    contact   : false,
    prospectus: false,
    activity  : false,
    quality   : false,
    adresse   : false,
  };

  validProcess       = false; 
  validSupplierSheet = false;
  checked            = false;
  checked1           = false;
  requiredName       = false;

  supplierType       : any;
  selectedType       : any;

  name               : string;
  triName            : string;
  relationAffaire    : string;
  groupe             : string;
  folderRef          : string;
  respJurName        : string;
  chipIcon           : string = '';
  chipSeverity       : string = 'secondary';
  chipValue          : string = 'nouveau';
 
  errorMessages      : string[] = [];

  constructor(
    private layoutService  : LayoutService,
    private processService : ProcessService,
    private messageService : MessageService, 
    private supplierService: SupplierService ) {}

  ngOnInit() {
    this.layoutService.onMenuToggle();
    this.supplierType = [
      { name: 'EE', code: 'EE' },
      { name: 'LE', code: 'LE' },
      { name: 'LL', code: 'LL' },
      { name: 'ER', code: 'ER' },
      { name: 'EG', code: 'EG' },
    ];
    this.processService.triggerFunction$.subscribe(() => {
      this.checkValidSupplierProcess();
    });
  }

  checkValidSupplierProcess() {
    this.supplierService.setFolderRef(this.folderRef);
    this.supplierService.setSupplierType(this.selectedType);
    this.checkName();
    this.paymentComponent.checkValidPayment();
    this.taxeComponent.checkValidTaxe();
    this.bankComponent.checkValidBank();
    this.contactComponent.checkValidContact();
    this.prospectusComponent.checkValidProspectus();
    this.activityComponent.checkValidActivity();
    this.qualityComponent.checkValidQuality();
    this.adresseComponent.checkValidAdresse();
    this.updateChip();
  }

  updateStatus(type: string, status: boolean) {
    this.status[type] = status;
    this.validateSupplierSheet();
  }

  validateSupplierSheet() {
    const allTabsValid = Object.values(this.status).every(status => status === true);
    this.validSupplierSheet = allTabsValid && !this.requiredName ;
    this.processService.setProcessStatus(this.validSupplierSheet); 
  }

  checkName(){    
    this.requiredName = !this.name;
    if (this.requiredName) {
      this.showError('Le nom fournisseur est obligatoire !');
    } else {
      this.name = this.name.toUpperCase(); 
    }
  }
   
  showError(messages: string | string[]) {
    if (typeof messages === 'string') {
      messages = [messages];
    }  
    this.errorMessages = messages;  
    messages.forEach(message => {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
    });
  }

  updateChip() {

    const format         = this.supplierService.getFormat();
    const cin            = this.supplierService.getCin();
    const mfFileName     = this.supplierService.getMfFileName();
    const tauxTaxeValue  = this.supplierService.getTauxTaxeValue();
    const zoneTaxeValue  = this.supplierService.getZoneTaxeValue();
    const usageTaxeValue = this.supplierService.getUsageTaxeValue();
    const adresse        = this.supplierService.getAdresse();
    const ville          = this.supplierService.getVille();
    const pays           = this.supplierService.getPays();
    const telephone      = this.supplierService.getTel();
    const devise         = this.supplierService.getDevise();
    const compteAchat    = this.supplierService.getCompteAchat();
    const condition      = this.supplierService.getCondition();
    const formeJur       = this.supplierService.getFormeJur();

    this.chipIcon        = 'pi pi-times';
    this.chipSeverity    = 'danger';
    this.chipValue       = 'Invalide';
  
    if (!format || !format.code) {
      return;
    }
  
    if (this.selectedType && ['LG', 'LL', 'LR', 'LF', 'LS', 'LT'].includes(this.selectedType.code)) {
      if (['PM', 'PPP', 'PPNP'].includes(format.code)) {
        if (!cin || !mfFileName) {
          return;
        }
      }
  
      if (!tauxTaxeValue || !zoneTaxeValue || !usageTaxeValue) {
        return;
      }
    }

    const requiredFields = { adresse, ville, pays, telephone, devise, compteAchat, condition, formeJur };
    const undefinedFields = [];
  
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        undefinedFields.push(key);
      }
    }
  
    if (undefinedFields.length > 0) {
      this.chipIcon = 'pi pi-exclamation-triangle';
      this.chipSeverity = 'warning';
      this.chipValue = 'Incomplet';
      return;
    }
  
    if (format.code === "EP") {
      if (!tauxTaxeValue || !zoneTaxeValue || !usageTaxeValue) {
        return;
      }
 
      const localRequiredFields = { adresse, ville, pays, telephone, devise, compteAchat, condition };
      const localUndefinedFields = [];
  
      for (const [key, value] of Object.entries(localRequiredFields)) {
        if (value === undefined || (Array.isArray(value) && value.length === 0)) {
          localUndefinedFields.push(key);
        }
      }
  
      if (localUndefinedFields.length > 0) {
        this.chipIcon = 'pi pi-exclamation-triangle';
        this.chipSeverity = 'warning';
        this.chipValue = 'Incomplet';
        return;
      }
    }
  
    this.chipIcon = 'pi pi-check';
    this.chipSeverity = 'success';
    this.chipValue = 'Valide';

  }

}
