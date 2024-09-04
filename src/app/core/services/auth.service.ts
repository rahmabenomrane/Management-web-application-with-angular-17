import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string | null = null;

  private apiLocal                     = environment.apiUrl;

  private checkIsUserByUsernameUrl     = this.apiLocal + '85c0d42e2cfa00b1bb14778328d8418f';
  private initializeUserPasswordUrl    = this.apiLocal + 'd3a71ffa8f855a93bb144483c02455ac';
  private getTokenUrl                  = this.apiLocal + 'dfda8799c5c39f95a2141cc83c3d893a';
  private logoutUrl                    = this.apiLocal + 'be2064c1d84fc59a9414e909943a4c18';
  private resetPasswordUrl             = this.apiLocal + 'c1b461741bf15eab9314c4ba90c8c989';
  private sendEmailVerificationCodeUrl = this.apiLocal + '90a65dad015f829dc1143a9a90c48940';
  private resetForgotPasswordUrl       = this.apiLocal + 'b8a29ddf1c8cbba0c1143c9ab82effea';
  private checkVerifCodeUrl            = this.apiLocal + 'ce812d1f6febc9b8c1143b9a10334e8c';

  constructor(private http: HttpClient) { }

  checkIsUserByUsername(username: string): Observable<any> {   
    const payload = { "user": [{ "username": username }] };
    return this.http.post<any>(this.checkIsUserByUsernameUrl, payload);
  }

  getTokenAPI(username: string, password: string): Observable<any> {    
    const payload = {
        "user": [{
            "username": username,
            "password": password
        }]
    };
   
    return this.http.post<any>(this.getTokenUrl, payload); 
  }


  LogoutApi(token: string): Observable<any> {    
    return this.http.post<any>(this.logoutUrl, null); 
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  checkVerifCode(userId: string, token : string): Observable<any> { 
    const payload = {
      
        "Query": {
            "tt_user_resetPWD": [
                {
                    "resetToken_userId": userId,
                    "resetToken_token": token,

                }
            ]
        }   
    };
    return this.http.post<any>(this.checkVerifCodeUrl, payload);
  }

  sendEmailVerififcationCode(userId: string): Observable<any> { 
    const payload = {
      
        "Query": {
            "tt_user": [
                {
                    "user_id": userId
                }
            ]
        }   
    };
    return this.http.post<any>(this.sendEmailVerificationCodeUrl, payload);
  }

  resetForgotPassword(password: string, username: string, code: string , token: string): Observable<any> { 
    const payload = {
      "user": [
          {
              "password": username,
              "username": username,
              "code": code
          }
      ]
    };
    return this.http.post<any>(this.resetForgotPasswordUrl, payload);
  }

  resetPassword(oldPassword: string, newPassword: string , token: string): Observable<any> { 
    const payload = {
      "user": [
          {
              "oldPassword": oldPassword,
              "password": newPassword
          }
      ]
    };
    return this.http.post<any>(this.resetPasswordUrl, payload);
  }

  initializeUserPassword(username: string, password: string): Observable<any> {    
    const payload = {
        "user": [{
            "username": username,
            "password": password
        }]
    };
    return this.http.post<any>(this.initializeUserPasswordUrl, payload); 
  }

/*   isAuthenticated(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    else {
      return false;
    }
  }
 */

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token); 
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token'); 
    }
    return this.token; 
  }
  
  
}
