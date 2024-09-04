import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule        } from '@angular/forms';
import { MessageService     } from 'primeng/api';
import { ButtonModule       } from 'primeng/button';
import { DropdownModule     } from 'primeng/dropdown';
import { FileUploadModule   } from 'primeng/fileupload';

import { InputGroupModule   } from 'primeng/inputgroup';
import { InputSwitchModule  } from 'primeng/inputswitch';
import { InputTextModule    } from 'primeng/inputtext';
import { ToastModule        } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SupplierService    } from 'src/app/modules/purchase/supplier-services/supplier.service';


@Component({
  selector   : 'payment',
  standalone : true,
  imports    : [FormsModule,
                InputTextModule, 
                DropdownModule, 
                InputGroupModule, 
                ButtonModule, 
                FileUploadModule, 
                ToggleButtonModule, 
                ToastModule, 
                InputSwitchModule 
               ],
  templateUrl: './payment.component.html',
  styleUrl   : './payment.component.css',
  providers  : [MessageService]

})

export class PaymentComponent {

    @Output() paymentStatus = new EventEmitter<boolean>();
    @Output() errorMessages = new EventEmitter<string[]>();

    ConvFileName      : string;
    TarifFileName     : string;

    mpValue           : string;
    conditionValue    : string;
    deviseValue       : string;
    bankValue         = "00";

    checked           = false;
    validPayment      = true;

    docTarifRequired  = false;
    docConvRequired   = false;
    mpRequired        = false;
    conditionRequired = false;
    deviseRequired    = false;
    
    mpList            = [{ format: 'Personne morale', code: 'PM' }];

    errorMessageArray : string[] = [];

    constructor(private supplierService: SupplierService, 
                private messageService : MessageService
    ) { }
  
    ngOnInit() { }
  
    checkValidPayment(): void {
      this.errorMessageArray = [];

      this.checkRequiredFields();
  
      this.supplierService.setDevise(this.deviseValue);
      this.supplierService.setCondition(this.conditionValue);

      this.validPayment = !this.docTarifRequired && !this.docConvRequired && !this.mpRequired && !this.conditionRequired && !this.deviseRequired;

      this.paymentStatus.emit(this.validPayment);
      this.errorMessages.emit(this.errorMessageArray);

    }

  
    checkRequiredFields() {

      const refValue = this.supplierService.getFolderRef();
      const typeValue = this.supplierService.getSupplierType();

      this.mpRequired = !this.mpValue;
      if (this.mpRequired) {
        this.showError('MP est obligatoire !');
      }
  
      this.conditionRequired = !this.conditionValue;
      if (this.conditionRequired) {
        this.showError('Condition est obligatoire !');
      }
  
      this.deviseRequired = !this.deviseValue;
      if (this.deviseRequired) {
        this.showError('Devise est obligatoire !');
      }

      if (this.checked) {
        this.docConvRequired = !this.ConvFileName;
        if (this.docConvRequired) {
          this.showError('Doc Convention est obligatoire !');
        }
      } else {
        this.docConvRequired = false;
      }

      if (typeValue && ['LL', 'EE'].includes(typeValue.code)) {
        if (refValue === undefined || refValue === '') {
          this.docTarifRequired = !this.TarifFileName;
          if (this.docTarifRequired) {
            this.showError('Doc Tarif est obligatoire !');
          }
        } else {
          this.docTarifRequired = false;
        }
      } else {
        this.docTarifRequired = false;
      }
    }
  
    onFileSelected(event: any, fileType: string) {
      const fileName = event.target.files[0]?.name;
  
      if (fileType === 'convention') {
        this.ConvFileName = fileName;
      } else if (fileType === 'tarifPrix') {
        this.TarifFileName = fileName;
      }
    }

    showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
      this.errorMessageArray.push(message);
    }
}