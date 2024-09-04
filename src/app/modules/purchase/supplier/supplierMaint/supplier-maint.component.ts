import { CommonModule       } from '@angular/common';
import { Component          } from '@angular/core';
import { ViewChild          } from '@angular/core';
import { FormsModule, 
         ReactiveFormsModule} from '@angular/forms';
import { CardModule         } from 'primeng/card';
import { DropdownModule     } from 'primeng/dropdown';
import { InputTextModule    } from 'primeng/inputtext';
import { PanelModule        } from 'primeng/panel';
import { TabViewModule      } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PaymentComponent   } from './tabs/payment/payment.component';
import { TaxeComponent      } from './tabs/taxe/taxe.component';
import { BankComponent      } from './tabs/bank/bank.component';
import { ContactComponent   } from './tabs/contact/contact.component';
import { ActivityComponent  } from './tabs/activity/activity.component';
import { ProspectusComponent} from './tabs/prospectus/prospectus.component';
import { QualityComponent   } from './tabs/quality/quality.component';
import { LayoutService      } from 'src/app/core/services/layout.service';
import { SupplierService    } from '../../supplier-services/supplier.service';
import { ToastModule        } from 'primeng/toast';
import { ConfirmationService, 
         MessageService     } from 'primeng/api';
import { ButtonModule       } from 'primeng/button';
import { TagModule          } from 'primeng/tag';
import { SidebarModule      } from 'primeng/sidebar';
import { InputSwitchModule  } from 'primeng/inputswitch';
import { AdresseComponent   } from './tabs/adresse/adresse.component';
import { RadioButtonModule  } from 'primeng/radiobutton';
import { CheckboxModule     } from 'primeng/checkbox';
import { MultiSelectModule  } from 'primeng/multiselect';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector   : 'supplier-maint',
  standalone : true,
  imports    : [
    FormsModule,
    CommonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    ToggleButtonModule,
    TabViewModule,
    PanelModule,
    ToastModule,
    PaymentComponent,
    TaxeComponent,
    BankComponent,
    ContactComponent,
    ActivityComponent,
    ProspectusComponent,
    QualityComponent,
    ButtonModule,
    TagModule,
    SidebarModule,
    InputSwitchModule,
    AdresseComponent,
    ReactiveFormsModule,
    RadioButtonModule,
    CheckboxModule,
    MultiSelectModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  templateUrl: './supplier-maint.component.html',
  styleUrls  : ['./supplier-maint.component.css'],
  providers  : [MessageService, ConfirmationService]
})
export class SupplierMaintComponent {

  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  @ViewChild(TaxeComponent) taxeComponent: TaxeComponent;
  @ViewChild(BankComponent) bankComponent: BankComponent;
  @ViewChild(ContactComponent) contactComponent: ContactComponent;
  @ViewChild(ProspectusComponent) prospectusComponent: ProspectusComponent;
  @ViewChild(ActivityComponent) activityComponent: ActivityComponent;
  @ViewChild(QualityComponent) qualityComponent: QualityComponent;
  @ViewChild(AdresseComponent) adresseComponent: AdresseComponent;

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

  validSupplierMaint = false;
  checked            = false;
  checked1           = false;
  integrateSupplier  = false;
  requiredName       = false;
  intgerationSidebar = false;
  showTextArea       = false;

  errorMessages      : string[] = [];
  name               : string;
  triName            : string;
  relationAffaire    : string;
  groupe             : string;
  folderRef          : string;
  respJurName        : string;
  ribValue           : string;
  chipIcon           : string = '';
  chipSeverity       : string = 'secondary';
  chipValue          : string = 'nouveau';

  selectedMotif      : any[] = [];
  supplierType       : any;
  selectedType       : any;

  motifs             : { key: string, name: string }[] = [
    { key: '1', name: 'Fournisseur partenaire' },
    { key: '2', name: 'Fournisseur Exclusif ou Monopole' },
    { key: '3', name: 'Fournisseur de Reference' },
    { key: '4', name: 'Avantages commerciaux spécifiques' },
    { key: '5', name: 'Un Bon Historique d’achat avec le groupe' },
    { key: '6', name: "Fournisseur recommandé par l'Unité Opérationnelle" },
    { key: '7', name: 'Aisance au paiement' },
    { key: '8', name: 'Autres' },
  ];

  constructor(
    private layoutService      : LayoutService,
    private supplierService    : SupplierService,
    private messageService     : MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.layoutService.onMenuToggle();
    this.supplierType = [
      { name: 'EE', code: 'EE' },
      { name: 'LE', code: 'LE' },
      { name: 'LL', code: 'LL' },
      { name: 'ER', code: 'ER' },
      { name: 'EG', code: 'EG' },
    ];
  }

  onMotifChange() {
    this.showTextArea = this.selectedMotif.some(motif => motif.key === '8');
  }

  checkName() {
    this.requiredName = !this.name;
    if (this.requiredName) {
      this.showError('Le nom fournisseur est obligatoire !');
    } else {
      this.name = this.name.toUpperCase();
    }
  }

  checkValidSupplierMaint() {
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

  checkIntegration() {
    this.ribValue = this.supplierService.getRIB();

    if (this.chipSeverity == "success") {
      if(this.ribValue){
        this.integrateSupplier = true;
        this.showSuccess()
      }else {
        this.integrateSupplier = false;
        this.confirm("Il faut au moins un RIB au niveau données bancaires.");

      }
    } else {
      this.integrateSupplier = false;
      this.confirm("Fiche fournisseur Incomplète");
    }

  }  
  
  updateStatus(type: string, status: boolean) {
    this.status[type] = status;
    this.validateSupplierMaint();
  }

  validateSupplierMaint() {
    const allTabsValid = Object.values(this.status).every(status => status === true);
    this.validSupplierMaint = allTabsValid && !this.requiredName;
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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "L'intégration du fournisseur est lancée."});
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

  confirm(msg : string) {
    this.confirmationService.confirm({
      header: 'Alerte',
      message: msg ,
      acceptIcon: 'pi pi-check mr-2',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptLabel: 'Ok',
      rejectVisible: false 
    });
  }

}
