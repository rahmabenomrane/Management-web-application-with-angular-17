import { Component, ViewChild, ElementRef } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from 'src/app/core/services/user.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'header-bar',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	standalone: true,
	imports: [FormsModule ,CommonModule,AvatarModule, MenuModule, DialogModule, InputGroupAddonModule, InputGroupModule,InputTextModule, ButtonModule, PasswordModule ] 
})
export class HeaderComponent {

    fullName         : string  = "";
    password         : string  = "";
    userId           : string  = "";
	value!           : string  ;
    oldUsername      : string = ""; 
    oldPassword      : string = ""; 
    pathPhoto        : string = ""; 

	items            : MenuItem[] | undefined;
	visible          : boolean = false;
	editMode         : boolean = false; 
	selectedFile     : File | null = null;

   
	@ViewChild('navBarLeft')
	navBarLeft!: ElementRef;
	@ViewChild('searchContainer')
	searchContainer!: ElementRef;
	
	constructor(  private layoutService: LayoutService,
		          private userService  : UserService ,
		          private authService  : AuthService ,
	) { }

	ngOnInit() {
		
		this.userId = localStorage.getItem('userId') ;
        this.fullName = this.userService.getFullName(); 
		this.password = this.userService.getPassword();
		this.pathPhoto = this.userService.getPathPhoto();

		this.items = [
			
			{
				label: 'Thèmes',
				icon: 'pi pi-fw pi-cog',
				command: () => {
                    this.onConfigButtonClick()
                }
			},
			{
				label: 'Gérer le profil',
				icon: 'pi pi-fw pi-user-edit',
				command: () => {
                    this.showDialog()
                }
			},
			/* {
				label: 'Langues',
				icon: 'pi pi-fw pi-flag'
			}, */

			{
				label: 'Se déconnecter',
				icon: 'pi pi-fw pi-power-off', 
				command: () => {
                    this.logout()
                }
			}
		];
	}

	onFileSelected(event: any) {
		this.selectedFile = event.target.files[0];		
	}

	onUpload() {
		if (this.selectedFile) {
			const token = this.authService.getToken();
			if (token) {
				this.userService.updateUserProfilePhoto(this.selectedFile, token).subscribe(
					response => {
						if (response.data && response.data.ProfilePicture && response.data.ProfilePicture.length > 0) {
							this.pathPhoto = response.data.ProfilePicture[0].url;
							localStorage.setItem("pathPhoto", this.pathPhoto);

						} else {
							console.error('Profile picture URL not found in response');
						}
					},
					error => {
						console.error('Error updating profile picture:', error);
					}
				);
			}
		} else {
			console.error('No file selected');
		}
	}
	
	  
	resetPassword(oldPassword: string, newPassword: string){
        const token = this.authService.getToken();
        if (token) {
          this.authService.resetPassword(oldPassword,newPassword, token).subscribe(
            (response) => {
             console.log("response", response);
            }
          );
        }   
    } 

	logout(): void {        
		const token = this.authService.getToken();
		if (token) {
			this.authService.LogoutApi(token).subscribe(
				(response) => {
					console.log("response", response);
					for (let key in localStorage) {
						localStorage.removeItem(key);
					}					
					window.location.reload();
				},
				(error) => {
					console.error("Logout failed:", error);
				}
			);
		}
	}
	
    updateUserName(username: string){
		console.log("username", username);
        const token = this.authService.getToken();
        if (token) {
          this.userService.updateUserName(username, token).subscribe(
            (response) => {
             console.log("response", response);
            }
          );
        } 
    } 

	toggleEditMode() {
		this.editMode = !this.editMode;
		if (this.editMode) {
			this.oldUsername = this.fullName;
			this.oldPassword = this.password; 
		}
	}
	
	closeDialog() {
		if (this.editMode && (this.fullName !== this.oldUsername || this.password !== this.oldPassword)) {
			if (this.fullName !== this.oldUsername) {
				this.updateUserName(this.fullName);
				this.userService.setFullName(this.fullName);
			}
			if (this.password !== this.oldPassword) {
				this.resetPassword(this.oldPassword, this.password);
				localStorage.setItem("password", this.password);
			}
		}
		this.onUpload();

		this.editMode = false;
		this.visible = false;
	}
	   
	showDialog() {
        this.visible = true;
    }
	focusSearch():void {
		this.searchContainer.nativeElement.style.setProperty('width', '100%');
		this.navBarLeft.nativeElement.style.setProperty('flex', '0.5');
	}

	blurSearch():void {
		this.searchContainer.nativeElement.style.removeProperty('width');
		this.navBarLeft.nativeElement.style.setProperty('flex', '1');
	}
	onConfigButtonClick() {
		this.layoutService.showConfigSidebar();
	}
}