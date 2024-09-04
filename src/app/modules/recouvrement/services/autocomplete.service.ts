import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) { }
  api = environment.apiUrl

  getRecovrers(searchFor: string): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});
    const serviceId = "8b767d72db4c6181bc14e12368eec798"
    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ "searchFor": searchFor, }] } });

  }

  getCustomerClasses(searchFor: string): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});
    const serviceId = "840074dfdda8afacbc14c22284d32992"
    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ searchFor: searchFor, }] } });

  }
  getRegion(searchFor: string): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});
    const serviceId = "a9ca21dd5554ed84bc14c022a80433db"
    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ searchFor: searchFor, }] } });

  }

  getperiodFilterRC(searchFor: string): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});
    const serviceId = "be708639348ec189bc14e77ee4e4b72f"
    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ searchFor: searchFor, }] } });

  }

  getTypes(searchFor: string): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});
    const serviceId = "f11d9af8a6ea5a9ebf144492a80a99ff"
    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ searchFor: searchFor, }] } });

  }

  getEntities(searchFor: string): Observable<any> {
    const serviceId = "bf19c6075c5fc695bb14ed36fc8a6de0"
    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});

    return this.http.post<any>(this.api + serviceId, { query: { entity: [{ searchFor: searchFor }] } });

  }
  getCustomersID(searchFor: string): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});
    const serviceId = "8b767d72db4c6181bc14bc22b43ee631"

    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ searchFor: searchFor }] } });

  }
  AutocompleteStatus(searchFor: string): Observable<any> {
    const serviceId = "b087f366591bdf95c31428e090d1cb47"
    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ searchFor: searchFor, }] } });
  
  }
  AutocompleteActionType(searchFor: string): Observable<any> {
    const serviceId = "b31fd325f44c90b3c414ad2a24d128af"
    return this.http.post<any>(this.api + serviceId, { query: { filter: [{ searchFor: searchFor, }] } });
  
  }

  // getScenarioListFilter(searchFor: string): Observable<any> {
  //   return this.http.post<any>(this.api + "8685ca9de835ff8ec31494ecf4ff70dd", { query: { filter: [{ searchFor: searchFor }] } });
  // }
}


