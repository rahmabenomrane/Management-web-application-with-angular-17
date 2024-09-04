import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SupplierService } from 'src/app/modules/purchase/supplier-services/supplier.service';

@Component({
  selector: 'maint-bank',
  standalone: true,
  imports: [FormsModule,InputTextModule,TableModule, ToastModule, InputGroupModule, ButtonModule, DropdownModule],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css',
  providers  : [MessageService]
})
export class BankComponent {
  
  @Output() bankStatus = new EventEmitter<boolean>();
  @Output() errorMessages = new EventEmitter<string[]>();


  validBank       = true;
  requiredBank    = false;
  requiredRib     = false;
  bankValue       : string;
  statusFileName  : string;
  mfFileName      : string;
  selectedFileName: string;
  bankList        : any;
  ribValue        : any;

  errorMessageArray : string[] = [];


  constructor(private messageService: MessageService, private supplierService: SupplierService) { }

  ngOnInit() {
    this.bankList = [
      { name: 'EE', code: 'EE' },
      { name: 'LE', code: 'LE' },
      { name: 'LL', code: 'LL' },
      { name: 'ER', code: 'ER' },
      { name: 'EG', code: 'EG' },
    ];
  }

  checkValidBank() {
    this.errorMessageArray = [];
    this.checkRequiredFields();

    /* this.validBank = !this.requiredBank; */

    this.supplierService.setRIB(this.ribValue)
    
    this.bankStatus.emit(this.validBank);
    this.errorMessages.emit(this.errorMessageArray);

    /* console.log(`%cDonnées bancaires ${this.validBank ? 'Valide' : 'Invalide'}`, `color: ${this.validBank ? 'green' : 'red'};`); */
  }

  checkRequiredFields() {
    if (this.bankValue) {
      this.requiredBank = false;
      this.showError('Banque est obligatoire !');
    }else {
      this.requiredBank = true;
    }

    /* if (this.ribValue) {
      this.requiredRib = false;
      this.showError('Rib est obligatoire !');
    }else {
      this.requiredRib = true;
    } */
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
    this.errorMessageArray.push(message);
  }

  onFileSelected(event: any, fileType: string) {
    const fileName = event.target.files[0]?.name;

    if (fileType === 'status') {
      this.statusFileName = fileName;
    } else if (fileType === 'docMF') {
      this.mfFileName = fileName;
    }
  }
}