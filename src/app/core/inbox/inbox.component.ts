import { CommonModule   } from '@angular/common';
import { Component      } from '@angular/core';
import { FormsModule    } from '@angular/forms';
import { Router, RouterModule, RouterOutlet         } from '@angular/router';
import { log } from 'console';
import { ButtonModule   } from 'primeng/button';
import { CardModule     } from 'primeng/card';
import { DialogModule   } from 'primeng/dialog';
import { InputTextModule} from 'primeng/inputtext';
import { SidebarModule  } from 'primeng/sidebar';
import { TableModule    } from 'primeng/table';
import { TagModule      } from 'primeng/tag';
import { ToolbarModule  } from 'primeng/toolbar';
import { TooltipModule  } from 'primeng/tooltip';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProcessService } from '../services/process.service';
import { LayoutService } from 'src/app/core/services/layout.service';


@Component({
  selector   : 'inbox',
  standalone : true,
  imports    : [CommonModule,FormsModule, RouterModule, RouterOutlet ,CardModule, TableModule, TagModule, ButtonModule, ToolbarModule, InputTextModule, DialogModule, SidebarModule, TooltipModule],
  templateUrl: './inbox.component.html',
  styleUrl   : './inbox.component.css'
})
export class InboxComponent {
 
  inboxList        : any[]   = [];
  inboxDetailsList : any[]   = [];
  modulesList      : any[]   = [];
  instanceByModule : any[]   = []; 
  selectedTask     : any[]   = []; 
  selectedStep     : any[]   = []; 
  rowGroupMetadata : any;

  isRowHovered     : boolean = false;
  dialogVisible    : boolean = false;
  sidebarVisible   : boolean = false;
  loading          : boolean = true; 
  noData           : boolean = false; 

  processId        : string; 
  processRevision  : string; 
  oProcessId       : string;
  nbr              : string;

  iframeUrl        : string | null;
  iframeId         : string | null;

  constructor(private authService: AuthService, private processService: ProcessService, private layoutService: LayoutService, private router : Router) { }

  ngOnInit() {
    this.getTaskInstances();
  }

  setProcessInfo(process: any){    

    this.processId       = process.processId;
    this.processRevision = process.nbrRevision;
    this.oProcessId      = process.oprocessId;
    this.nbr             = process.inbox_otask_nbr;

    this.processService.setProcessId(this.processId);
    this.processService.setProcessRevision(this.processRevision);
    this.processService.setOprocessId(this.oProcessId);
    this.processService.setNbr(this.nbr);

    this.getOprocessInfo();
  }

  getProcessHistory(process: any) {

    this.dialogVisible = true;

    this.processId       = process.processId;
    this.processRevision = process.nbrRevision;
    this.oProcessId      = process.oprocessId;
    this.nbr             = process.inbox_otask_nbr;

    this.processService.setProcessId(this.processId);
    this.processService.setProcessRevision(this.processRevision);
    this.processService.setOprocessId(this.oProcessId);
    this.processService.setNbr(this.nbr);


    const storedData = localStorage.getItem('inboxDetailsList');
    const token = this.authService.getToken();
    if (!storedData) {
      if (token) {
        this.processService.getProcessHistory(this.processId, this.processRevision, this.oProcessId, token).subscribe(
          (response) => {
            if (response.data && response.data.tt_inbox_det) {

              this.inboxDetailsList = response.data.tt_inbox_det.map(instance => ({
                otaskNbr     : instance.inboxt_otask_nbr,
                taskId       : instance.inboxt_task_id,
                stepName     : instance.inboxt_task_name,
                stepActor    : instance.inboxt_otask_actor.split('-')[0], 
                stepActors   : instance.inboxt_otask_actor,
                stepDecision : instance.inboxt_otask_decision,
                stepStartTime: instance.inboxt_otask_enter_date,
                stepEndTime  : instance.inboxt_otask_enter_date,
                stepAge      : instance.inboxt_otask_age,
                stepComment  : instance.inboxt_otask_comment,
              }));
              localStorage.setItem('inboxDetailsList', JSON.stringify(this.inboxDetailsList));

            }
          }
        );
      }
    } else {
      this.inboxDetailsList = JSON.parse(storedData);
    }
  } 

  getTaskByModule(module: any) {
    const storedInboxList = JSON.parse(localStorage.getItem('inboxList') || '[]');
    this.inboxList = storedInboxList.filter(item => {
        return item.processModule === module;
    });
  }

  getTaskInstances() {    
    /* const storedData = localStorage.getItem('inboxList');
    if (!storedData) { */
    this.loading = true;

        const token = this.authService.getToken();
        if (token) {
            this.processService.getTaskInstances(token).subscribe(
                (response) => {

                  console.log("response", response);
                  this.loading = false

                    if (response.data && response.data.tt_inbox) { 
                        this.noData = false;
                        this.inboxList = response.data.tt_inbox.map(instance => ({
                            inboxId: `${instance.inbox_process_id} . ${instance.inbox_process_revision} . ${instance.inbox_oprocess_id}`,
                            taskId: instance.inbox_otask_id,     
                            processEntity: instance.inbox_entity,
                            processName: instance.inbox_process_name,
                            processAge: instance.inbox_process_age,
                            currentStep: instance.inbox_task_name,
                            currentStepStatus: instance.inbox_process_status,
                            creationDate: instance.inbox_otask_start_time,
                            currentTaskAge: instance.inbox_task_age,
                            comment: instance.inbox_oprocess_comment,
                            processModule: instance.inbox_f7,
                            processId: instance.inbox_process_id,
                            inbox_otask_nbr: instance.inbox_otask_nbr,
                            nbrRevision: instance.inbox_process_revision,
                            oprocessId: instance.inbox_oprocess_id,
                            deadline: instance.inbox_task_deadline,
                        })); 

                        localStorage.setItem('inboxList', JSON.stringify(this.inboxList));
                        const processModules = this.inboxList.map(instance => instance.processModule);
                        this.modulesList = [...new Set(processModules)]; 

                       
                    }else{
                      this.noData = true;
                      console.log("no data found in inbox");
                    }
                },
            );
        } 
    } /* else {
        this.inboxList = JSON.parse(storedData);
        const processModules = this.inboxList.map(instance => instance.processModule);
        this.modulesList = [...new Set(processModules)];          
    } 
  }*/

  getOprocessInfo(): void {  
    const token = this.authService.getToken();
    if (token) {
        this.processService.getOprocessInfo(this.processId, this.processRevision,this.oProcessId, token).subscribe(
            (response) => {
              if (response.data && response.data.tt_process) {                 
                const newPlatform = response.data.tt_process[0].newPlatforme;
                if(newPlatform){                  
                  this.router.navigate(['/process']);
                  if (response.data && response.data.tt_form) {
                    const formRouter = response.data.tt_form[0].form_router;
                    this.router.navigate([formRouter]);
                  }
                } else {
                  this.iframeId = this.processId;
                  this.router.navigate(['iframes', this.iframeId]); 
                }               
              }
                       
            },
        );
    }  
  } 

  showDialog() {
    this.dialogVisible = true;
  }

  onSort() {
    this.rowGroupMetadata = {};

     if (this.inboxList) {      
      for (let i = 0; i < this.inboxList.length; i++) {
        const rowData = this.inboxList[i];
        const moduleName = rowData?.processName || '';
        if (i === 0) {
          this.rowGroupMetadata[moduleName] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.inboxList[i - 1];
          const previousRowGroup = previousRowData?.processName;
          if (moduleName === previousRowGroup) {
            this.rowGroupMetadata[moduleName].size++;
          } else {
            this.rowGroupMetadata[moduleName] = { index: i, size: 1 };
          }
        }
      }
    } 
  }

}
  
