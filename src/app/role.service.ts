import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterCriteria } from './gestuti/gestuti.component';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private getapiUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=b4cda1e0efa542a5c714a18e80f06686';

  constructor(private http: HttpClient) { }

  getRoles(nomFilter: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);

    const filters: FilterCriteria[] = [{ idrole: "" }];


    if (nomFilter) {
      filters.push({ idrole: nomFilter });
    }

    const body = {

      Query: {
        paginate: [
          {
            numberLine: 4000,
            currentPage: 1
          }
        ],
        filter: filters
      }

    };

    return this.http.post(this.getapiUrl, body, { headers });
  }


  
  private syncRolesUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=90fc37255083528fc714608fe86b6495';
  getSyncRoles(role: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);
    console.log("role", role);

    const body = {

      "Query": {
        "paginate": [
          {
            "numberLine": 10,
            "currentPage": 1
          }
        ],
        "filter": [
          {
            "role": role,
            "roleRelated": ""
          }
        ]

      }
    };
    console.log("done", this.http.post<any>(this.syncRolesUrl, body, { headers }))
    return this.http.post<any>(this.syncRolesUrl, body, { headers });
  }

  private modulesUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=834444a6eaa2e186c71435ade02f12e3';

  getModules(): Observable<any> {
    const body = {
      "Query": {
        "paginate": [
          {
            "numberLine": 10,
            "currentPage": 1
          }
        ],
        "filter": [
          {
            "module": ""
          }
        ]
      }
    };
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);

    return this.http.post<any>(this.modulesUrl, body, { headers });
  }

  private updateRoleUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=a1448807f1aa44b1c7148e9b74be505e';

  updateRole(roleId: string, description: string, modules: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);

    const body = {
      "Query": {
        "Role": [
          {
            "id": roleId,
            "description": description,
            "modules": [
              {
                "id": modules
              }
            ]
          }
        ]
      }
    };

    return this.http.post<any>(this.updateRoleUrl, body, { headers });
  }

  private deleteRoleUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=b32a034358a0d994c7144efad491cc7b';

  deleteRole(body: any): Observable<any> {
    return this.http.post<any>(this.deleteRoleUrl, body);
  }
  private apiUrluseradd = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=f621e574b19fbc99c714809b38bb2cca';
  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrluseradd, userData);
  }
  private deleteUserRoleUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=90446022b48d67adc71452fa8057c936';

  deleteUserRole(body: any): Observable<any> {
    return this.http.post<any>(this.deleteUserRoleUrl, body);
  }
  /*  private apiUrlupuser = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=cfc1b1d46ab4ce8dc7140c9c98d690c7';

  // Méthode pour mettre à jour un utilisateur
updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);

    const body = JSON.stringify(userData);
    console.log("body", body);
    
    return this.http.post<any>(this.apiUrlupuser , body);
  }*/
    updateUser(userData: any): Observable<any> {
      console.log(userData);
      return this.http.post('http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=cfc1b1d46ab4ce8dc7140c9c98d690c7', userData);
    }

    //sync role
    private addUrlsync = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=cfc1b1d46ab4ce8dc7147e9bac86ca26';
    private updateUrlsync = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=9979fb6f6fa3369cc714919b04616109';
  
    addRole(roleData: any): Observable<any> {
      return this.http.post<any>(this.addUrlsync, roleData);
    }
  
    modifyRole(roleData: any): Observable<any> {
      return this.http.post<any>(this.updateUrlsync, roleData);
    }
    private deleteSyncRoleUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=f78a0cf2de21e183c71450fac83f7e8f';

    deleteSyncRole(body: any): Observable<any> {
      return this.http.post<any>(this.deleteSyncRoleUrl, body);
    }
}
