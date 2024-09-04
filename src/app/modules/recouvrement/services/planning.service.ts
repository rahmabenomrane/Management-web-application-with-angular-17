import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http: HttpClient) { }
  private api = environment.apiUrl

  getPlanning(filtre: any): Observable<any> {


    const serviceId = "d7b3ca8b1fb2a1b6c3142052ac183d55"
    return this.http.post<any>(this.api + serviceId, {
      "Query": {
        "filter": filtre
      }
    });
  }

  getPlanningListView(page, rows, sortField, sortOrder, filtre): Observable<any> {


    const serviceId = "e18c1949edb89ab7c314d7ee40040ae1"
    return this.http.post<any>(this.api + serviceId, {
      "Query": {
        "filter": filtre,
        paginate: [{ currentPage: page, numberLine: rows, sortField: sortField, sortOrder: sortOrder }]
      }
    });
  }
  getPlanningActions(filtre): Observable<any> {


    const serviceId = "ff46f112b0116798c314e152ac1812fa"
    return this.http.post<any>(this.api + serviceId, {
      "Query": {
        "filter": filtre
      }
    });
  }
  getPlanningCustActions(filtre: any): Observable<any> {


    const serviceId = "ff46f112b0116798c314e152ac1812fa"
    return this.http.post<any>(this.api + serviceId, {
      "Query": {
        "filter": filtre
      }
    });
  }
  getPlanningActionInvoice(actionId, actionDate): Observable<any> {


    const serviceId = "d68cbe7fdf08468dc314fd64ec920dad"
    return this.http.post<any>(this.api + serviceId, {
      "Query": {
        "RecoveryPlan": [
          {
            "actionId": actionId,
            "actionDate": actionDate
          }
        ]
      }
    });
  }

  getPlanningActionCustomFields(actionId): Observable<any> {


    const serviceId = "dec49c3d257176a5c414b51ca8d48e36"
    return this.http.post<any>(this.api + serviceId, {
      "Query": {
        "RecoveryPlan": [
          {
            "actionId": actionId,
          }
        ]
      }
    });
  }


}
