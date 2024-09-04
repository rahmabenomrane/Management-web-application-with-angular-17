import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(private http: HttpClient) { }
  api = environment.apiUrl + "bf19c6075c5fc695bb14ed36fc8a6de0"

  getEntities(searchFor: string): Observable<any> {

    // var headers = new HttpHeaders({"Authorization":"CMpIJp2kAjpbQWuyZbhpVRt1iXvE/X4Z1LfsaZMd5o/0mvpseHtQpZpNbfTdBKCXvlpszy2AXFEcUZkKu4C8cLGzh4tOThovvP/3Nq/DO+9sQnIWYI/F/969PckNqc+HKySmzYfk9z33Y4Dat1B93XuncjVEJMcGXM/yULdmoss=","DEVICE-ID":"352698276144152","APP-ID":"cc9259a2df493dbe9314c53fe8fdd902", "ENTITY-ID":"5057"});

    return this.http.post<any>(this.api, { query: { entity: [{ searchFor: searchFor, }] } });

  }
}
