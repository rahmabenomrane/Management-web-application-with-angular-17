import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/core/services/user.service';
import { PasswordModule } from 'primeng/password';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputOtpModule } from 'primeng/inputotp';
import { AutoFocusModule } from 'primeng/autofocus';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.css'],
  standalone : true , 
  imports    : [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, PasswordModule, StyleClassModule,
                InputTextModule,  ButtonModule, ToastModule, InputOtpModule , AutoFocusModule, ButtonModule ],
  providers  : [MessageService]

})
export class LoginComponent implements OnInit {
    value : any
    user                  : User = new User('', '', '', '', '','');
    currentCard           : string = 'login_username';
    password              : string | null;
    newPassword           : string | null;
    confirmPassword       : string | null;
    username              : string | null;
    token                 : string | null;
    verificationCode      : string | null;
    userItems             : any[]   = [];
    loading = [false, false, false, false];
    
    constructor(
      private router        : Router        ,
      private authService   : AuthService   ,
      private userService   : UserService   ,
      private messageService: MessageService
    ) {}

    ngOnInit() {}


    checkVerififcationCode(): void {
      
      this.authService.checkVerifCode(this.username, this.verificationCode).subscribe(
        (response) => {
          if (response.status) {            
            this.currentCard = 'init_pwd';
          }else{
            this.showError('Code verification Incorrecte !');
            this.currentCard = 'code_card';
          }
        },
        (error) => {
          console.error('error', error);
        }
      );
    }

    sendEmailVerififcationCode(username: string): void {
      this.authService.sendEmailVerififcationCode(this.username).subscribe(
        (response) => {
          if (response.status) {
              this.currentCard = 'code_card';
          }else{
            this.showError("Code verification incorrecte.") 
          }
        },
        (error) => {
          console.error('error', error);
        }
      );
    }

    checkUsername(username: string) {          
      this.loading[0] = true; 
  
      this.authService.checkIsUserByUsername(username).subscribe(
          (response) => {
              this.loading[0] = false; 
  
              if (response.status) {  
                //Remplit le tableau userItems avec les données des utilisateurs retournées par la réponse
                  this.userItems = response.data.users.map(userItem => ({
                      username: userItem.username,
                      fullname: userItem.fullname,
                      pathPhoto: userItem.pathPhoto,
                      password: userItem.password   
                  }));
  
                  this.userItems.forEach(userItem => {
                      this.userService.setFullName(userItem.fullname);
                      this.userService.setUsername(userItem.username);
                      this.userService.setPathPhoto(userItem.pathPhoto);
                      this.userService.setPassword(userItem.password); 
                  });
  
                  this.user.password = this.userItems.map(userItem => userItem.password);
                  this.user.fullname = this.userItems.map(userItem => userItem.fullname);
                  this.user.username = this.userItems.map(userItem => userItem.username);
                  this.user.pathPhoto = this.userItems.map(userItem => userItem.pathPhoto);
  
                  if (this.userItems.some(userItem => userItem.password === true)) {
                      this.currentCard = 'login_username';
                  } else {
                      this.currentCard = 'new_user';
                  }
  
                  this.switchCard();
              } else {
                  this.showError('Utilisateur Inexistant');
              }
          },
          (error) => {
              this.loading[0] = false; 
              console.error('error:', error);
          }
      );
    }
   

    login() {
      this.userService.setPassword( this.password);     
      this.getToken(this.username, this.password);  
    }

    getToken(username: string, password: string): void {
      this.loading[1] = true; 
      this.authService.getTokenAPI(username, password).subscribe(
        (response) => {
          this.loading[1] = false; 
          if (response.status) {
            this.token = response.data.sessionRequest[0].token;
            this.authService.setToken(this.token); 
            this.router.navigate(['']);
          }else{
            this.showError('Mot de passe incorrecte !');
          }
        },
        (error) => {
          this.loading[1] = false; 
          console.error('error', error);
        }
      );
    }

    checkPassword(newPassword: string, confirmPassword: string): void {
      if (newPassword === confirmPassword) {
          this.password = this.newPassword;          
          this.InitializeUser(this.username, this.password)
      } else {
        this.showError('Les mots de passe ne correspondent pas !');
      }
    }
    
    InitializeUser(username: string, password: string) {
      this.authService.initializeUserPassword(username, password).subscribe(
        (response) => {
          if (response.status) {
            this.showSuccess('Le nouveau mot de passe est initialisé avec succès')
            this.getToken(this.username, this.password);  
          } 
        },
        (error) => {
          console.error('error', error);
        }
      );
    }

    showSuccess(message: string) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }
    
    showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
    }
    switchCard() {
      if (this.currentCard === 'login_username') {
        this.currentCard = 'login_pwd';
      } else if (this.currentCard === 'forgot_pwd') {
        this.currentCard = 'code_card';
      } else if (this.currentCard === 'code_card') {
        this.currentCard = 'init_pwd';
      } else if (this.currentCard === 'new_user') {
        this.currentCard = 'init_pwd';
      }
    }

    switchBackCard() {
      if (this.currentCard === 'login_pwd') {
        this.currentCard = 'login_username';
      } else if (this.currentCard === 'code_card') {
        this.currentCard = 'login_username';
      } else if (this.currentCard === 'init_pwd') {
        this.currentCard = 'login_username';
      } 
    } 
  
    redirectToForgotPwd() {    
      if (this.currentCard === 'login_pwd') {
          this.currentCard = 'code_card';
          this.sendEmailVerififcationCode(this.username);  
      } else {
        this.currentCard = 'login_username';
      }
    }

    redirectToInitPwd() {    
      if (this.currentCard === 'forgot_pwd') {
        this.currentCard = 'init_pwd';
      } else {
        this.currentCard = 'login_username';
      }
    }
  
  }
