import { CommonModule     } from '@angular/common';
import { Component        } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserMaintService } from 'src/app/core/services/user-maint.service';


@Component({
  selector: 'user-maint',
  standalone: true,
  imports: [ FormsModule ,ReactiveFormsModule, CommonModule, ToastModule, ToolbarModule, TableModule, DialogModule, ConfirmDialogModule, RatingModule, TagModule,
  ToolbarModule, ButtonModule, DialogModule, InputTextModule, ToggleButtonModule],
  templateUrl: './user-maint.component.html',
  styleUrl: './user-maint.component.css',
  providers: [MessageService]
})

export class UserMaintComponent {

  userId            : string = "";
  selectedId        : string = '';
  newUserId         : string = '';
  newUserName       : string = '';
  newUserEmail      : string = '';
  newUserExtEmail   : string = '';
  newUserEntity     : string = '';
  newUserResp       : string = '';

  usersList         : any[] = [];
  selectedUser      : any;
  usersDetailsList  : any[] = [];

  currentPage       : number;
  numberLine        : number;
  totalPages        : number;
  totalRecords      : number;

  checked           : boolean = false; 
  userDetailsDialog : boolean = false;
  addUserDialog     : boolean = false;

  formGroup!        : FormGroup;

  constructor(private userMaintService: UserMaintService,private authService: AuthService, private messageService: MessageService
  ){
    this.currentPage  = 1; 
    this.numberLine   = 8; 
    this.totalPages   = 1;  
    this.totalRecords = 0;  
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      checked: new FormControl<boolean>(false)
    });
  }

  getAllUsers(event: LazyLoadEvent) {
    this.currentPage = event.first / event.rows + 1;
    this.numberLine = event.rows;
  
    const token = this.authService.getToken();
    setTimeout(() => {
        this.userMaintService.getAllUsers(this.currentPage, this.numberLine, token).subscribe(
            (response) => {
              console.log("response", response);
              
                  if (response.data && response.data.tt_user) {
                    this.usersList = response.data.tt_user.map(userList => ({
                        userId: userList.user_id,
                        userDomain: userList.user_domain,
                        userMail: userList.user_mail,
                        userPwd: userList.user_pwd,
                        userToken: userList.user_cryptPWD,
                        userResponsible: userList.user_responsible,
                        userName: userList.user_name,
                        userUsed: userList.user_used,
                        userEnabled: userList.user_enabled,
                        userEntity: userList.user_entity,
                        userStructure: userList.user_structure,
                        userTheme: userList.user_theme,
                        userLang: userList.user_lang,
                        userExternalMail: userList.user_extern_mail,
                        userPathPhoto: userList.user_pathPhoto,
                        userResetPWD: userList.resetPWD,
                        RecordId: userList.RecordId,
                        RecordCreateDate: userList.RecordCreateDate,
                        RecordUpdateDate: userList.RecordUpdateDate,
                    }));

                    console.log("usersList", this.usersList);

    

                  } 
                  /* if (response.data && response.data.tt_employee) {
                  this.usersDetailsList = response.data.tt_employee.map(userDetail => ({
                      importDate: userDetail.date_importation,
                      codePoste: userDetail.Code_Poste,
                      situFamil: userDetail.Libelle_Situation_Familiale,
                      birthdayVille: userDetail.Code_Ville_Naissance,
                      birthday: userDetail.Date_Naissance,
                      debutContratDate: userDetail.Date_debut_Contrat,
                      country: userDetail.Libelle_Pays_Naissance,
                      gouvernement: userDetail.Libelle_Gouv_Naissance,
                      contractType: userDetail.Libelle_Type_Contrat,
                      cordinatorId: userDetail.Matricule_Coordinateur,
                      directorId: userDetail.Matricule_Directeur,
                      hierarchy: userDetail.Niveau_Hierarchique,
                      paie: userDetail.Code_Etablissement_Paie,                        
                  }));


                    console.log("usersDetailsList", this.usersDetailsList);
                  } */ 
            }
        );
    }, 1000);

  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  openDetailsDialog() {
    this.userDetailsDialog = true;
  }

  addNew() {
    this.addUserDialog = true;
  }

  hideDialog() {
    this.userDetailsDialog = false;
    this.addUserDialog = false;
  }
 

  getUserById(item: any) {
    this.selectedUser = item;
    this.selectedId = item.userId;
    setTimeout(() => {
    const token = this.authService.getToken();
    if (token) {
        this.userMaintService.getUserById(this.selectedId, token).subscribe(
            (response) => {
                if (response.data.tt_user) {
                  }
                if (response.data.tt_employee) {
                    console.log("response", response.data.tt_employee);
                }
            }
        );
    }
  }, 1000);
}
 addNewUser(){

    const token = this.authService.getToken();
    if (token) {
      this.userMaintService.addNewUser(this.newUserId,this.newUserEmail,this.newUserResp,this.newUserName ,this.newUserEntity ,this.newUserExtEmail, token).subscribe(
        (response) => {
          console.log("response", response);
          this.hideDialog()
          this.showSuccess("Utilisateur ajouté avec succès.")
        }
      );
    }   
  } 

  activateUser(){
    console.log("this.selectedId", this.selectedId);
  
    const token = this.authService.getToken();
    if (token) {
        this.userMaintService.activateUser(this.selectedId, token).subscribe(
            (response) => {
              console.log("response", response);
            }
        );
    }
  } 

}
