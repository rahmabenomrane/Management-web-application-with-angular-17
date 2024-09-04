import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule        } from '@angular/forms';
import { log } from 'console';
import { MessageService     } from 'primeng/api';
import { ButtonModule       } from 'primeng/button';
import { DropdownModule     } from 'primeng/dropdown';
import { InputGroupModule   } from 'primeng/inputgroup';
import { InputNumberModule  } from 'primeng/inputnumber';
import { InputTextModule    } from 'primeng/inputtext';
import { ToastModule        } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SupplierService    } from 'src/app/modules/purchase/supplier-services/supplier.service';

@Component({
  selector   : 'maint-taxe',
  standalone : true,
  imports    : [FormsModule,InputTextModule, DropdownModule, ToggleButtonModule, ButtonModule, InputGroupModule, InputNumberModule, ToastModule, FormsModule, CommonModule ],
  templateUrl: './taxe.component.html',
  styleUrl   : './taxe.component.css',
  providers  : [MessageService]

})
export class TaxeComponent {

  @Output() taxeStatus = new EventEmitter<boolean>();
  @Output() errorMessages = new EventEmitter<string[]>();

  validTaxe           = false;
  taxeChecked         = false;
  requiredDocStatus   = false;
  requiredDocMF       = false;
  requiredMF          = false;
  requiredFormeJur    = false;
  requiredTauxTaxe    = false;
  requiredZoneTaxe    = false;
  requiredUsageTaxe   = false;
  errorJur            = false;

  isValidFiscalNumber = true;
  validCA             = true;
  validCF             = true;

  errorMessageArray   : string[] = [];

  selectedFileName    : string;
  statusFileName      : string;
  mfFileName          : string;
  compteAchatValue    : string;
  compteCfValue       : string;
  tauxTaxeValue       : string;
  zoneTaxeValue       : string;
  usageTaxeValue      : string;

  formeJurValue       : any;
  mfCinValue          : any;
  formatValue         : any;
  typeValue           : any;
  tauxtaxeList        : any;
  zonetaxeList        : any;
  usagetaxeList       : any;

  formatList = [
    { format: 'Personne morale', code: 'PM' },
    { format: 'Personne physique patentée', code: 'PPP' },
    { format: 'Personne physique non patentée', code: 'PPNP' },
    { format: 'Etrangé', code: 'E' },
    { format: 'Etablissement Publique', code: 'EP' },
    { format: 'Bloqué', code: 'B' },
  ];

  formeJurList = [
    { name: 'Commercial industriel et prestataire de service', code: 'CIPS' },
    { name: 'Entreprise Publique', code: 'EP' },
    { name: 'Personne libérale', code: 'PL' },
    { name: 'SA', code: 'SA' },
    { name: 'SARL', code: 'SARL' },
    { name: 'SAS', code: 'SAS' },
    { name: 'SNC', code: 'SNC' },
    { name: 'SUARL', code: 'SUARL' },
  ];

  constructor(private messageService: MessageService, private supplierService: SupplierService ) { }

  ngOnInit() {
    this.typeValue = { code: '' };

    this.tauxtaxeList = [
      { key : '1', value: 'Article Exonéré' },
    ];

    this.zonetaxeList = [
      { key : '1', value: 'Export ' },
      { key : '2', value: 'Local susp TVA et FODEC' },
      { key : '3', value: 'Local Imposable' },
      { key : '4', value: 'Forfaitaire' },
    ];

    this.usagetaxeList = [
      { key : '1', value: 'Client non majoré (Assuj)' },
    ];
    
  }

  checkValidTaxe(): void {

    this.errorMessageArray = [];

    this.checkCompteAchat();
    this.checkRequiredFields();
    this.checkTypeAndFormat();
    this.validateFiscalNumber();
    this.setData();

    this.validTaxe = this.validCA && this.validCF && !this.requiredDocStatus && !this.errorJur && !this.requiredMF && !this.requiredDocMF 
    && !this.requiredFormeJur && !this.requiredTauxTaxe && !this.requiredZoneTaxe && !this.requiredUsageTaxe;
   
    this.taxeStatus.emit(this.validTaxe);
    this.errorMessages.emit(this.errorMessageArray); 
  }

  setData(){
    this.supplierService.setFormat(this.formatValue);
    this.supplierService.setCin(this.mfCinValue);
    this.supplierService.setMfFileName(this.mfFileName);
    this.supplierService.setTauxTaxeValue(this.tauxTaxeValue);
    this.supplierService.setZoneTaxeValue(this.zoneTaxeValue);
    this.supplierService.setUsageTaxeValue(this.usageTaxeValue);
    this.supplierService.setCompteAchat(this.compteAchatValue);
    this.supplierService.setFormeJur(this.formeJurValue);
  }

  checkRequiredFields() {

    const isNonPublicEntity = this.formatValue?.code !== 'PM' &&  this.formatValue?.code !== 'EP' &&  this.formeJurValue?.code !== 'EP';
    this.typeValue = this.supplierService.getSupplierType(); 

    if (!this.typeValue?.code || !this.formatValue?.code) {
      return;
    }

    if (!this.formeJurValue) {
      this.requiredFormeJur = true;
      this.showError('Forme Juridique est obligatoire !');
    } else {
      this.requiredFormeJur = false;
    }

    if (!this.statusFileName) {
      this.requiredDocStatus = true;
      this.showError('Doc status est obligatoire.');
    } else {
      this.requiredDocStatus = false;
    }
    
    if (isNonPublicEntity && !this.mfCinValue) {
      this.requiredMF = true; 
      this.showError('MF / CIN est obligatoire.');
    } else {
      this.requiredMF = false;
    }
 
  }
  
  checkCompteAchat() {
    const compteAchatNumber = Number(this.compteAchatValue);
    const isValid = !isNaN(compteAchatNumber) &&
      ((compteAchatNumber >= 20000000 && compteAchatNumber <= 30000000) ||
        (compteAchatNumber >= 60000000 && compteAchatNumber <= 70000000));

    this.validCA = isValid;
    if (!isValid) {
      this.showError('Compte achat doit être compris entre 20000000-30000000 ou 60000000-70000000.');
    }
  }

  checkTypeAndFormat() {
    if(this.formatValue?.code === 'PPNP'){
        console.log("PPNP");
    }
    if (!this.typeValue || !this.typeValue.code) {
      return;
    }
    
    if (['EE', 'ER', 'EG'].includes(this.typeValue.code)) {
      this.formatValue = this.formatList.find(format => format.code === 'EP');
      const isValidCF = ['40600000', '40100000'].includes(this.compteCfValue);
      this.validCF = isValidCF;
      if (!isValidCF) {
        this.showError('Compte CF doit être 40600000 ou 40100000.');
      }
    } 
  
    if (['EE', 'ER'].includes(this.typeValue.code)) {
      this.taxeChecked    = false;
      this.tauxTaxeValue  = this.tauxtaxeList.find(value => value.key === '1');
      this.zoneTaxeValue  = this.zonetaxeList.find(value => value.key === '1');
      this.usageTaxeValue = this.usagetaxeList.find(value => value.key === '1');
      this.formatValue    = this.formatList.find(format => format.code === 'E');
    } 
  
    if (this.typeValue.code === 'LE') {      
      this.formatValue    = this.formatList.find(format => format.code === 'EP');
      this.taxeChecked    = false;
      this.tauxTaxeValue  = this.tauxtaxeList.find(value => value.key === '1');
      this.zoneTaxeValue  = this.zonetaxeList.find(value => value.key === '2');
      this.usageTaxeValue = this.usagetaxeList.find(value => value.key === '1');
      this.formatValue    = this.formatList.find(format => format.code === 'EP');
    }
  
    if (this.formatValue?.code !== 'E' && ['EE', 'ER', 'EG'].includes(this.typeValue)) {
      this.showError('Veuillez choisir le type Etranger');
    } 
  
    if (this.formatValue?.code === 'E' && !['EE', 'ER', 'EG'].includes(this.typeValue)) {
      this.showError('Le type et le format du fournisseur sont incompatibles');
    }
  
    if (this.formatValue?.code === 'PPP' && this.formeJurList) {
      this.formeJurValue = this.formeJurList.find(forme => forme.code === 'CIPS');
    }
  
    if (this.formatValue?.code !== 'E' && this.formeJurValue && (['PL', 'CIPS'].includes(this.formeJurValue.code))) {
      this.errorJur = true;
      this.showError('Erreur forme juridique !');
    }    
    
  }
  
  checkCin(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
     if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    } 
  }
 
  validateFiscalNumber(): void {

    if (!this.mfCinValue ) {
      return;
    }

    const pattern = /^[0-9]{7}[A-HJ-NP-Z][ABPDFN][MCPNE][0-9]{3}$/;
    const codeZ = this.mfCinValue.charAt(8);
    const codeT = this.mfCinValue.charAt(9);

   

    this.isValidFiscalNumber = pattern.test(this.mfCinValue);

    if (!this.isValidFiscalNumber) {
      this.requiredMF = true;
      this.showError('Matricule fiscale invalide.');
    } else {
      this.requiredMF = false;
      this.isValidFiscalNumber = true;

      // Handling codeZ
      if (["A", "B", "P", "D"].includes(codeZ)) {  
        this.taxeChecked = true;
        this.zoneTaxeValue = this.zonetaxeList.find(value => value.key === '3');
        this.usageTaxeValue = this.usagetaxeList.find(value => value.key === '1');
      } else if (codeZ === "F") {  
        this.taxeChecked = true;
        this.zoneTaxeValue = this.zonetaxeList.find(value => value.key === '4');
        this.usageTaxeValue = this.usagetaxeList.find(value => value.key === '1');
      } else if (codeZ === "N") {  
        this.taxeChecked = false;
        this.tauxTaxeValue = this.tauxtaxeList.find(value => value.key === '1');
        this.zoneTaxeValue = this.zonetaxeList.find(value => value.key === '2');
        this.usageTaxeValue = this.usagetaxeList.find(value => value.key === '1');
      }

      // Handling codeT
      if (codeT === "M" || codeT === "E") {
        this.formatValue = this.formatList.find(format => format.code === 'PM');
      } else if (codeT === "C" || codeT === "P") {
        this.formatValue = this.formatList.find(format => format.code === 'PP');
      } else if (codeT === "N") {
        this.formatValue = this.formatList.find(format => format.code === 'EP');
      }
    }
  }

  onFileSelected(event: any, fileType: string) {
    const fileName = event.target.files[0]?.name;
    if (fileType === 'status') {
      this.statusFileName = fileName;
    } else if (fileType === 'docMF') {
      this.mfFileName = fileName;
    }
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
    this.errorMessageArray.push(message);    
  }
}
