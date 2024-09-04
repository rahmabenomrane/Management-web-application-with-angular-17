import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private iframeUrl: string | null = null;
  private iframeId : string | null = null;

  private apiLocal                     = environment.apiUrl;

  private getMenusAndModulesUrl    = this.apiLocal + 'dc0f1265f7247bbebe147b2a40ff4e13';
  private getUserFavoriteMenuUrl   = this.apiLocal + 'c19d1d8ae2d2aaaac014356dac43309b';
  private getUserFavoriteModuleUrl = this.apiLocal + 'c19d1d8ae2d2aaaac014376d98bd4b4f';
  private toggleFavoriteModuleUrl  = this.apiLocal + 'c19d1d8ae2d2aaaac0146d6d4869d6cd';
  private toggleFavoriteMenuUrl    = this.apiLocal + 'c19d1d8ae2d2aaaac014636d38078262';

  constructor(private http: HttpClient) { }
  
  getMenusAndModules(token: string ): Observable<any> {

    return this.http.post<any>(this.getMenusAndModulesUrl, null);  
  }

  getUserFavoriteMenu(token: string ): Observable<any> {
    return this.http.post<any>(this.getUserFavoriteMenuUrl, null);  
  }

  getUserFavoriteModule(token: string ): Observable<any> {
    return this.http.post<any>(this.getUserFavoriteModuleUrl, null);  
  }

  toggleFavoriteMenu( userId: string, menuId: string,token: string ): Observable<any> {    
    const payload = {
      "Query": {
        "tt_user_fav_menu": [
          {
              "user_id": userId,
              "menu_id": menuId
          }
      ]  
      }
    }; 
    console.log("payload", payload);
    
    return this.http.post<any>(this.toggleFavoriteMenuUrl, payload); 
  }

  toggleFavoriteModule( userId: string, moduleId: string,token: string ): Observable<any> {    

    const payload = {
      "Query": {
        "tt_user_fav_module": [
          {
              "user_id": userId,
              "module_id": moduleId
          }
      ]  
      }
    }; 
    return this.http.post<any>(this.toggleFavoriteModuleUrl, payload); 
  }

  setIframeUrl(iframeUrl: string) {    
    this.iframeUrl = iframeUrl;
  }
  
  getIframeUrl() : string {
    return this.iframeUrl;
  }

  setIframeId(iframeId: string) {    
    this.iframeId = iframeId;
  }

  getIframeId(): string | null {
    return this.iframeId; 
  }

}
