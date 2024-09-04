import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { ProcessService } from '../services/process.service';
import { log } from 'console';

@Component({
  selector: 'start-process',
  standalone: true,
  imports :[CardModule,RouterOutlet,RouterModule,CommonModule,TableModule],
  templateUrl: './start-process.component.html',
  styleUrl: './start-process.component.css',
})

export class StartProcessComponent {

  processList     : any[];
  rowGroupMetadata: any;
  selectedProcess : any; 
  iframeId        : any; 
  processId       : string = '';  
  processName     : string = '';  
  taskName        : string = '';  
  newPlatform     : any; 
  processRevision : string = ''; 
  oProcessId      : string = '';  
  noData          : boolean = false; 
  loading         : boolean = true; 


  constructor(private authService: AuthService, private processService: ProcessService, private router: Router,private menuService: MenuService, ) { }

  ngOnInit(): void {
    this.getStartedProcess();
  }

  getOprocessInfo(): void {  


    const token = this.authService.getToken();
    if (token) {
        this.processService.getOprocessInfo(this.processId, this.processRevision,this.oProcessId, token).subscribe(
            (response) => {
              console.log("response", response);              
              if(response.data){
                if (response.data.tt_process) {
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
  
                if (response.data.tt_task) {
                  this.taskName = response.data.tt_task[0].task_name;           
                  response.data.tt_task.forEach((processItem, index) => {
                    this.processList[index].taskName = processItem.task_name;
                  });              
                } 
              }
                
            },
        );
    }  
  } 
  
  getStartedProcess() {
   /*  const storedData = localStorage.getItem('processList');
    if (!storedData) {  */
    this.loading = true;
      const token = this.authService.getToken();
      if (token) {
        this.processService.getStartedProcess(token).subscribe(
          (response) => {
            console.log("response", response);
            this.loading = false;
            
            if (response.data && response.data.tt_process) {
              this.noData = false;

              this.processList = response.data.tt_process.map(processItem => ({
                processId: processItem.process_id,     
                processName: processItem.process_name,
                processModule: processItem.process_bpmn,
                processDesc: processItem.process_desc,
              }));

            } else{
              this.noData = true;
              console.log("no data found in inbox");
            }

            localStorage.setItem('processList', JSON.stringify(this.processList));

          },
        );
      }
   }/* else{
      this.processList = JSON.parse(storedData);

    }  */
  /* } */

  onRowSelect(selectedProcess : any) {
    
    console.log("selectedProcess", selectedProcess);
    console.log("this.taskName", selectedProcess.taskName);
    console.log("this.processId", selectedProcess.processId);
    
    this.newPlatform = selectedProcess.newPlatforme;
    this.processId   = selectedProcess.processId;
    this.processName = selectedProcess.processName;
    this.taskName    = selectedProcess.taskName;

    this.processService.setProcessId(this.processId);
    this.processService.setProcessName(this.processName);
    this.processService.setTaskName(this.taskName);

    this.getOprocessInfo();
  }

  onSort() {
    this.rowGroupMetadata = {};

    if (this.processList) {
      for (let i = 0; i < this.processList.length; i++) {
        const rowData = this.processList[i];
        const moduleName = rowData?.processModule || '';

        if (i === 0) {
          this.rowGroupMetadata[moduleName] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.processList[i - 1];
          const previousRowGroup = previousRowData?.processModule;
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