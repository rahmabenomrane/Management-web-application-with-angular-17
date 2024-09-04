import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SupplierService } from 'src/app/modules/purchase/supplier-services/supplier.service';

@Component({
  selector: 'maint-contact',
  standalone: true,
  imports: [FormsModule,InputTextModule,TableModule, ToastModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers  : [MessageService]

})
export class ContactComponent {

  @Output() contactStatus = new EventEmitter<boolean>();
  @Output() errorMessages = new EventEmitter<string[]>();


  validContact = true;
  requiredTel  = false;
  telValue     : string;

  errorMessageArray : string[] = [];

  constructor(private messageService: MessageService,private supplierService: SupplierService) { }

  ngOnInit() {}

  checkValidContact() {
    this.errorMessageArray = [];

    this.checkRequiredTel();
    this.supplierService.setTel(this.telValue);

    this.validContact = !this.requiredTel;

    this.contactStatus.emit(this.validContact);
    this.errorMessages.emit(this.errorMessageArray);

    /* console.log(`%cContact ${this.validContact ? 'Valide' : 'Invalide'}`, `color: ${this.validContact ? 'green' : 'red'};`); */
  }

  checkRequiredTel(){
    this.requiredTel = !this.telValue;
    if (this.requiredTel) {
      this.showError('Numéro de téléphone est obligatoire !');
    }
  }

  checkTel(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
     if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    } 
  }

  checkFax(event: KeyboardEvent): void {
    const allowedChars = ['-', ' '];
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    const charCode = event.key.charCodeAt(0);
    if ((charCode < 48 || charCode > 57) && !allowedChars.includes(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
    this.errorMessageArray.push(message);
  }


}
