import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) { }
  api = environment.apiUrl
  getCustomersAmountDelayPerDaysFiltred(nbPage: number, nbLines: number, sortField: string, sortOrder: string, filtre: any): Observable<any> {

    const serviceId = "b7243942ac76bc82bb14b6b20c098947"

    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines, sortField: sortField, sortOrder: sortOrder }], filter: filtre } });
  }
  getAllCusomers(nbPage: number, nbLines: number, filtre: any): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});

    const serviceId = "c19ef19fb242b6b7bb14162594d34368"
    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines }], filter: filtre } });
  }
  getCustomerInvoices(nbPage: number, nbLines: number, sortField: string, sortOrder: string, filtre: any): Observable<any> {

    const serviceId = "81c9fe228b267594bd14835cb0a55aa3"
    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines, sortField: sortField, sortOrder: sortOrder }], filter: filtre } });

  }
  getCustomerById(filtre: any): Observable<any> {

    //var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});
    const serviceId = "fed9018f64247782bb14e84410073530"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }


  getCustomersAmountDelayPerDays(filtre: any): Observable<any> {
    const serviceId = "829cc996abdc46a8bb1400a5684c3add"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }
  getAgingDelayDetails(nbPage: number, nbLines: number, sortField: string, sortOrder: string, filtre: any): Observable<any> {

    const serviceId = "b93d1db67c9c169bbf14b2efac5f521d"

    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines, sortField: sortField, sortOrder: sortOrder }], filter: filtre } });
  }

  getCustomerDelayChart(filtre: any): Observable<any> {

    const serviceId = "bc46200ae7a830b8bf14b0efc8d2a9dd"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }
  getCustomersAmountDelay(filtre: any): Observable<any> {

    const serviceId = "abee84a40c203982bb142e935ce5420e"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }

  getEvoluationDelay(filtre: any): Observable<any> {

    const serviceId = "af576eb1f3848e8bbc14087e2c5e411f"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }

  getRecoveryForcast(filtre: any): Observable<any> {

    const serviceId = "dbbe48679ca35babbc1414cfd4d3e950"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }



  getEvolutionRecoveryDelay(filtre: any): Observable<any> {

    const serviceId = "9ca264797b1ae293c0144c5d9458020c"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }

  getCustomersPieChartsAmount(filtre: any) {
    const serviceId = "952d166d8606b0afbe14448720a125f3"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }

  getCustomersAmountDetails(nbPage: number, nbLines: number, sortField: string, sortOrder: string, filtre: any) {
    const serviceId = "952d166d8606b0afbe147ca344d60efd"

    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines, sortField: sortField, sortOrder: sortOrder }], filter: filtre } });

  }
  getEvoluationDelayDetails(nbPage: number, nbLines: number, sortField: string, sortOrder: string, filtre: any) {
    const serviceId = "9ca264797b1ae293c014d751304524e6"

    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines, sortField: sortField, sortOrder: sortOrder }], filter: filtre } });

  }


  getRecoveryForecastFiltred(nbPage: number, nbLines: number, sortField: string, sortOrder: string, filtre: any): Observable<any> {

    const serviceId = "c0847fcd125f839dbe146ef3e019a4a0"

    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines, sortField: sortField, sortOrder: sortOrder }], filter: filtre } });
  }

  getEvolutionRecoveryDelayDetails(nbPage: number, nbLines: number, sortField: string, sortOrder: string, filtre: any): Observable<any> {

    const serviceId = "8a6e4ab71a581f96bf147d05f42e8b65"

    return this.http.post<any>(this.api + serviceId, { Query: { paginate: [{ currentPage: nbPage, numberLine: nbLines, sortField: sortField, sortOrder: sortOrder }], filter: filtre } });
  }

  getSituationDateDashboard(filtre: any): Observable<any> {

    const serviceId = "d76b0cb73b36be85c214c1810c7c779b"

    return this.http.post<any>(this.api + serviceId, { Query: { filter: filtre } });
  }
}
