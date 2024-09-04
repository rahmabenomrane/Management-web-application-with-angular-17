import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserMaintService {

  private apiLocal          = environment.apiUrl;

  private getAllUsersUrl    = this.apiLocal + 'bd82110ee74ea990c1145f129831b7a1';
  private getUserByIdUrl    = this.apiLocal + 'e1fa504a71c13589c1148a2ae820f351';
  private addNewUserUrl     = this.apiLocal + 'f51378809dac09b7c1145c2904ae8e0f';
  private activateUserUrl   = this.apiLocal + '94ec2dbbf47ce7acc1149b8e4c707e93';

  constructor(private http: HttpClient) {}

  getAllUsers(currentPage: number, numberLine: number, token : string): Observable<any> {    
      const payload = {
        "Query": {
          "paginate": [
            {
              "numberLine": numberLine,
              "currentPage": currentPage
            }
          ],
          "filter": []
        }
      };
  
      return this.http.post<any>(this.getAllUsersUrl, payload);
    }
  
  

    getUserById(userId: string, token: string): Observable<any> {    
      const payload = {
        "Query": {
          "tt_user": [
            {
              "user_id": userId
            }
          ],
          
        }
      }; 
  
      return this.http.post<any>(this.getUserByIdUrl, payload); 
    }

  addNewUser(id : string ,mail : string ,resp : string ,name : string ,entity : string ,extMail : string , token: string): Observable<any> {    
    const payload = {  
      "Query": {
          "tt_user": [
              {
                  "user_id": id,           
                  "user_mail": mail,                        
                  "user_responsible": resp,
                  "user_name": name,   
                  "user_entity" : entity,  
                  "user_extern_mail": extMail
              }
          ]
      }   
    }; 
    return this.http.post<any>(this.addNewUserUrl, payload); 
  }

  activateUser(userId : string, token: string): Observable<any> {    
    const payload = {
      "Query": {
        "tt_user": [
            {
                "user_id": userId
            }
        ]  
    }  
    }; 
    return this.http.post<any>(this.activateUserUrl, payload); 
  }

}
