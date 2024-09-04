import { HttpClient  } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Observable  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiLocal             = environment.apiUrl;
  
  private getPreferenceUrl     = this.apiLocal + 'a8eafb65dee0ba99c014553ffc007985';
  private savePreferenceUrl    = this.apiLocal + 'd61683831f961e88c014963f980130fa';
  private deletePreferenceUrl  = this.apiLocal + 'd61683831f961e88c014963f980130fa';
  private updateUserProfileUrl = this.apiLocal + 'd61683831f961e88c014963f980130fa';
  private updateUserNameUrl    = this.apiLocal + 'bcd56ac80e782e89c114c13c1cfe9900';
  private updateUserPhotoUrl   = this.apiLocal + 'bb156c478fc0bcb1c114184930585280';

  private fullName : string | null = null;
  private password : string | null = null;
  private username : string | null = null;
  private userTheme: string | null = null;
  private pathPhoto: string | null = null;

  constructor(private http: HttpClient) {}

  getPathPhoto(): string | null {
    if (!this.pathPhoto) {
      this.pathPhoto = localStorage.getItem('pathPhoto'); 
    }
    return this.pathPhoto; 
  }

  setPathPhoto(pathPhoto: string) {    
    this.pathPhoto = pathPhoto;
    localStorage.setItem('pathPhoto', pathPhoto); 

  }
  getPassword(): string | null {
    if (!this.password) {
      this.password = localStorage.getItem('password'); 
    }
    return this.password; 
  }

  setPassword(password: string) {    
    this.password = password;
    localStorage.setItem('password', password); 

  }

  setUsername(username: string) {    
    this.username = username;
    localStorage.setItem('username', username); 

  }

  getUsername(): string | null {
    if (!this.username) {
      this.username = localStorage.getItem('username'); 
    }
    return this.username; 
  }

  setFullName(fullName: string) {    
    this.fullName = fullName;
    localStorage.setItem('fullName', fullName); 

  }

  getFullName(): string | null {
    if (!this.fullName) {
      this.fullName = localStorage.getItem('fullName'); 
    }
    return this.fullName; 
  }

  setUserTheme(userTheme: string) {  
    this.userTheme = userTheme;
    
  }

  getUserTheme(): string | null {
    return this.userTheme; 
  }
 
  updateUserProfilePhoto(file: File, token: string): Observable<any> {
    const formData = new FormData();
    formData.append(file.name, file);
    return this.http.post<any>(this.updateUserPhotoUrl, formData);
  }

  updateUserName(username: string, token: string): Observable<any> {    
    const payload = {
      "Query": {
        "tt_user": [
            {         
                "user_name": username
            }
        ]
    }  
        
    }; 
    return this.http.post<any>(this.updateUserNameUrl, payload);  
  }

  updateUserProfile(username: string, token: string): Observable<any> {    
    const payload = {
        "user": [{
            "username": username,
        }]
    }; 
    return this.http.post<any>(this.updateUserProfileUrl, payload); 
  }

  getUserPreferences(username: string, token: string): Observable<any> {    
  
    const payload = {
        "user": [{
            "username": username,
        }]
    }; 
    return this.http.post<any>(this.getPreferenceUrl, payload); 
  }


  saveUserPreferences( userId: string, preferenceId: string, preferenceValue: any, preferenceDesc: string,  token: string ): Observable<any> {    
    const payload = {
      "Query": {
        "ttUserPreference": [
          {
            "userPreference_userId": userId,
            "userPreference_id": preferenceId,
            "userPreference_value": preferenceValue,
            "userPreference_desc": preferenceDesc
          }
        ] 
      }
    }; 

    return this.http.post<any>(this.savePreferenceUrl, payload); 
  }

  deleteUserPreferences( userId: string, preferenceId: string, preferenceValue: any, preferenceDesc: string ): Observable<any> {    
    const payload = {
      "Query": {
        "ttUserPreference": [
          {
            "userPreference_userId": userId,
            "userPreference_id": preferenceId,
            "userPreference_value": preferenceValue,
            "userPreference_desc": preferenceDesc
          }
        ] 
      }
    }; 

    return this.http.post<any>(this.deletePreferenceUrl, payload); 
  }
}
  

