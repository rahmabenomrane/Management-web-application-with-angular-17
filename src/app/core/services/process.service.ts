import { HttpHeaders } from '@angular/common/http';
import { HttpClient  } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  
  ProcessStatusSubject   : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  triggerFunctionSubject = new Subject<void>();
  triggerFunction$       = this.triggerFunctionSubject.asObservable();

  private processId      : string;
  private processRevision: string;
  private oProcessId     : string;
  private nbr            : string;
  private processName    : string;
  private taskName       : string;

  private apiLocal                     = environment.apiUrl;

  private getStartedProcessUrl    = this.apiLocal + 'aba7a4dfadbede8ec114ed1cc8bbe2fa';
  private getTaskInstancesUrl     = this.apiLocal + 'bac0d72b6f80d9a6c114da4a48edaa89';
  private getProcessHistoryUrl    = this.apiLocal + 'fa7aea82334c6182c114bc862c6fa11e';
  private getOprocessInfoUrl      = this.apiLocal + 'af95eda873a2a0aac11426f600befa95';

  constructor(private http: HttpClient) {}

  checkProcessStatus() {
    this.triggerFunctionSubject.next();
  }   

  setProcessStatus(value: boolean) {
    this.ProcessStatusSubject.next(value);
  }

  getStartedProcess(token : string): Observable<any> {
    return this.http.post<any>(this.getStartedProcessUrl, null);
  }

  getTaskInstances(token : string): Observable<any> {
    return this.http.post<any>(this.getTaskInstancesUrl, null);
  }

  getProcessHistory(processId : string, processRevision : string, oProcessId  : string, token : string): Observable<any> {
    const payload = {    
      "Query": {
        "tt_oprocess": [
            {
               "oprocess_process_id": processId,
               "oprocess_process_revision": processRevision,
               "oprocess_id": oProcessId
            }
        ]
    }    
    };
    return this.http.post<any>(this.getProcessHistoryUrl, payload);
  }

  getOprocessInfo(processId : string, processRevision : string, oProcessId  : string, token : string): Observable<any> {
    const payload = {    
      "Query": {
        "tt_oprocess": [
            {
               "oprocess_process_id": processId,
               "oprocess_process_revision": processRevision,
               "oprocess_id": oProcessId

            }
        ]
      }    
    };
    return this.http.post<any>(this.getOprocessInfoUrl, payload);
  }

  getProcessId(): string {
    return this.processId;
  }

  setProcessId(processId: string): void {
    this.processId = processId;
  }

  getProcessRevision(): string {
    return this.processRevision;
  }

  setProcessRevision(processRevision: string): void {
    this.processRevision = processRevision;
  }

  getOprocessId(): string {
    return this.oProcessId;
  }

  setOprocessId(oProcessId: string): void {
    this.oProcessId = oProcessId;
  }

  getNbr(): string {
    return this.nbr;
  }

  setNbr(nbr: string): void {
    this.nbr = nbr;
  }

  getProcessName(): string {
    return this.processName;
  }

  setProcessName(processName: string): void {
    this.processName = processName;
  }

  getTaskName(): string {
    return this.taskName;
  }

  setTaskName(taskName: string): void {
    this.taskName = taskName;
  }
  
}
