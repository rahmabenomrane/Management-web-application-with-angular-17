
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { FilterCriteria } from './maintenance/maintenance.component';


@Injectable({
  providedIn: 'root'
})
export class MenuService {


  private apiUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=f5b92b960c4580b0c714fe2c08cbe2e3';

  constructor(private http: HttpClient) { }

  getMenus(moduleFilter: string, nombreMenuFilter: number, nomFilter: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);
  
    const filters: FilterCriteria[] = [{ menuId: 1 }];
  
    if (moduleFilter) {
      filters.push({ module: moduleFilter });
    }
    if (nombreMenuFilter) {
      filters.push({ menu_nbr: nombreMenuFilter });
    }
    if (nomFilter) {
      filters.push({ menu_name: nomFilter });
    }
  let page=1;
  let rows=4000;  
    const body = {
      Query: {
        paginate: [
          {
            numberLine: rows,
            currentPage: page + 1
          }
        ],
        filter: filters,
        sort: [
          {
            menu_id: 'DESC'
          }
        ]
      }
    };
  
  return this.http.post(this.apiUrl, body, { headers });
  }

  

  private updateApiUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=b4cda1e0efa542a5c714bb2d9cef12c0';

  // Méthode pour mettre à jour un menu
  updateMenu(updatedMenuData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);


    const body = {
      Query: {
        ttMenu: [updatedMenuData]
      }

    };

    return this.http.put(this.updateApiUrl, body, { headers });
  }
  private deleteapiUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=90fc37255083528fc714c32df881d4ee'; // URL de suppression

  deleteMenu(menuId: number): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);

    const body = {
      ttMenu: [{ menu_id: menuId }]
    };

    return this.http.post(this.deleteapiUrl, body, { headers });
  }
}
