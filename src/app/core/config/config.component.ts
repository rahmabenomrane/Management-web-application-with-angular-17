import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarModule, RadioButtonModule, ButtonModule, InputSwitchModule],
})
export class ConfigComponent {

    @Input() minimal: boolean = false;

    scales           : number[] = [12, 13, 14, 15, 16];
    userPrefItems    : any[]   = [];
    userTheme        : string | null;
    userColorScheme  : string | null;
    userScale        : string | null;
    userInputStyle   : string | null;
    username         : string | null;
    userId           : string | null;

    constructor(
        
        public layoutService: LayoutService,
        public userService  : UserService  ,
        public authService  : AuthService  ,

    ) { }

    ngOnInit() {    
      this.userId = localStorage.getItem('username');         
      this.getUserPreferences(this.userId);
    }
    
    getUserPreferences(username: string): void {
      const storedTheme = localStorage.getItem('userTheme');
      const storedColorScheme = localStorage.getItem('userColorScheme');
    
      if (!storedTheme || !storedColorScheme) {
        const token = this.authService.getToken();
        if (token) {
          this.userService.getUserPreferences(username, token).subscribe(
            (response) => {
              if (response.data && response.data.userPreference) {
                this.userPrefItems = response.data.userPreference.map(userPrefItem => ({
                  userId: userPrefItem.userPreference_userId,
                  preferenceId: userPrefItem.userPreference_id,
                  preferenceValue: userPrefItem.userPreference_value,
                  preferenceDesc: userPrefItem.userPreference_desc,                                
                })); 
    
                localStorage.setItem('userPrefItems', JSON.stringify(this.userPrefItems));
    
                this.setUserTheme();
                this.changeTheme(this.userTheme, this.userColorScheme);
              }
            }
          );
        }
      } else {
        this.userTheme = storedTheme;
        this.userColorScheme = storedColorScheme;
        this.changeTheme(this.userTheme, this.userColorScheme);
      }
    }
    
      

    setUserTheme() {

      this.userTheme = null;
      this.userColorScheme = null;
      this.userScale = null;
      this.userInputStyle = null;
    
      this.userPrefItems.forEach(item => {
        switch (item.preferenceId) {

          case 'user_theme':
            this.userTheme = item.preferenceValue;
            break;
          case 'user_colorScheme':
            this.userColorScheme = item.preferenceValue;
            break;
          case 'user_scale':
            this.userScale = item.preferenceValue;
            break;
          case 'user_inputStyle':
            this.userInputStyle = item.preferenceValue;
            break;
        }
      });
    
      this.changeTheme(this.userTheme, this.userColorScheme);
      this.scale = parseInt(this.userScale); 
      this.inputStyle = this.userInputStyle;
    }
      

    savePreferences(userId: string , preferenceId: string, preferenceValue: string, preferenceDesc: string  ) {
      
        const token = this.authService.getToken();
        if (token) {
		        	this.userService.saveUserPreferences( userId, preferenceId, preferenceValue, preferenceDesc, token ).subscribe(
                (response) => {
                },
                (error) => {
                  console.error('Error saving preferences:', error);
                }
              );
        } 
    } 


    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }
    
    set scale(_val: number) {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: _val,
        }));
        this.savePreferences(this.userId, 'user_scale', `${_val}`, `${_val}`); 
        localStorage.setItem('userScale', _val.toString()); 
    }

    get inputStyle(): string {

        return this.layoutService.config().inputStyle;
    }
    set inputStyle(_val: string) {
        this.layoutService.config().inputStyle = _val;
        this.savePreferences(this.userId, 'user_inputStyle', _val, _val); 
        localStorage.setItem('userInputStyle', _val); 
    }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
        this.savePreferences(this.userId, 'user_theme', val, val); 
        localStorage.setItem('userTheme', val); 
    }
    get theme(): string {
        return this.layoutService.config().theme;
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
        this.savePreferences(this.userId, 'user_colorScheme', val,val); 
        localStorage.setItem('userColorScheme', val); 
    }
    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {        
        this.theme = theme;
        this.colorScheme = colorScheme;

        this.savePreferences(this.userId, 'user_theme', this.theme , 'test');
        this.savePreferences(this.userId, 'user_colorScheme', this.colorScheme,'test');

    }
      

    decrementScale() {
        this.scale--;
        this.savePreferences(this.userId, 'user_scale', `${this.scale}`, 'test');
    }
    

    incrementScale() {
        this.scale++;
        this.savePreferences(this.userId, 'user_scale', `${this.scale}`, 'test');
    }
}
