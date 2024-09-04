import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  api = environment.apiUrl
  getInvoiceStatusList(nbPage: number, nbLines: number,  searchFor: string): Observable<any> {

    const serviceId = "ff46f112b0116798c314e152152615fa"
    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines }], filter: [{ searchFor: searchFor, } ]} });
  }
  getActionTypeList(nbPage: number, nbLines: number,  searchFor: string): Observable<any> {

    const serviceId = "ff46f112b0116798c314e15298f408fa"
    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines }], filter: [{ searchFor: searchFor, } ]} });
  }
  saveInvoiceStatusDetails(status): Observable<any> {
    console.log("status", status);
    const serviceId = "ff46f112b0116798c314e15294401bfa"
    
    return this.http.post<any>(this.api+ serviceId, { Query: {tt_crm_dca_invoiceStatus: status }});
  }
}
