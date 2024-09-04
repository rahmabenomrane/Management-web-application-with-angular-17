import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProcessService } from '../services/process.service';


@Component({
  selector   : 'process-footer',
  standalone : true,
  imports    : [CommonModule,InputGroupModule,InputTextModule,DropdownModule,ButtonModule],
  templateUrl: './process-footer.component.html',
  styleUrl   : './process-footer.component.css'
})
export class ProcessFooterComponent {

  @Output() validateButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  processId       : string; 
  processRevision : string; 
  oProcessId      : string; 

  iframeUrl       : string | null;
  iframeId        : string | null;

  processName     : any[]  = [];
  processDecision : { decisionName: string }[] = [];
 
  validProcess : boolean = false;

  ngOnInit() { 
    this.processId       = this.processService.getProcessId();
    this.processRevision = this.processService.getProcessRevision();
    this.oProcessId      = this.processService.getOprocessId(); 
    this.getOprocessInfo();  
  }
  
  constructor(private authService: AuthService,private processService: ProcessService) {
  }

  onValidateButton() {
    this.validateButtonClicked.emit();
  }

  getOprocessInfo(): void {      
    const token = this.authService.getToken();
    if (token) {
        this.processService.getOprocessInfo(this.processId, this.processRevision, this.oProcessId, token).subscribe(
            (response) => {
              if (response.data && response.data.tt_decision) { 
                  this.processDecision = response.data.tt_decision.map(decisionItem => ({ decisionName: decisionItem.decision_name }));   
                  console.log("this.processDecision", this.processDecision);                          
              }        
            },
        );
    }  
  }


}
