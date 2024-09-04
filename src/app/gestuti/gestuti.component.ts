import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RoleService } from '../role.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { TranslateService, TranslateModule} from '@ngx-translate/core';


interface SousRole {
  nom: string;
  synchroniser: boolean;
}

interface Role {
  idrole: string;
  module: number;
  sousroles: SousRole[];
  synchronize: boolean;
  role_desc: string;
  role_id: string;

}


interface User {
  "userEntity_entity_id": string
  "userEntity_user_id": string,
  "userEntity_role_id": string,
  "userEntity_interim": string,
  "userEntity_interim_active": boolean,
  "userEntity_id": number,
  "is_seat": boolean,
  "userEntity_interim_active_logic": boolean,
  "userEntity_interim_start_date": string,
  "userEntity_interim_end_date_logi": boolean,
  "userEntity_interim_end_date": string,
  "userEntity_interim_quotidien": boolean,
  "userEntity_interim_hebdomadaire": boolean,
  "userEntity_interim_day_monday": boolean,
  "userEntity_interim_day_tuesday": boolean,
  "userEntity_interim_day_wednesday": boolean,
  "userEntity_interim_day_thursday": boolean,
  "userEntity_interim_day_friday": boolean,
  "userEntity_interim_day_saturday": boolean,
  "userEntity_interim_day_sunday": boolean

}
/*interface User {
  username: string;
  entite: string;
  accessSiege: boolean;
  configureInterim: boolean;
  interimRepetition: string;
  selectedDays?: { [key: string]: boolean }; // Object to track selected days
  startDate?: Date;
  endDate?: Date;
  interim: string;
}*/

export interface FilterCriteria {

  idrole?: string;
}
interface syncRole {
  "roleSync_roleId": string,
  "roleSync_roleRelated": string,
  "enabled": boolean,
  "roleSync_id": string
}

@Component({
  selector: 'app-gestuti',
  standalone: true,
  imports: [CommonModule,TranslateModule, FormsModule, ToastModule, ReactiveFormsModule, ScrollPanelModule, TableModule, DialogModule, ButtonModule, DropdownModule, CalendarModule, OrderListModule, CheckboxModule, InputTextModule, CheckboxModule, RadioButtonModule],
  templateUrl: './gestuti.component.html',
  styleUrls: ['./gestuti.component.scss'],
  providers: [MessageService, RoleService]
})
export class GestutiComponent implements OnInit {
  roles: Role[] = [];
  checked: boolean = false;
  checkedsyn: boolean = false;
  selectedRole: Role | null = null;
  modules: null;
  displayAddRoleDialog: boolean = false;
  newRole: { idrole: '', description: '', module: null };
  synchronizer: boolean = false;
  newSousRole: SousRole = { nom: '', synchroniser: false };
  userFormDisabled: boolean = false; // Variable to control the form's disabled state
  roleFormDisabled: boolean = false;
  newsyncRole: syncRole = { roleSync_roleId: '', roleSync_roleRelated: '', enabled: false, roleSync_id: '' };
  module: null;

  idrole: string = '';
  description: string = '';
  sousroles: SousRole[];
  username: string = '';
  entite: string = '';
  interim: string = '';
  accessSiege: boolean = false;
  configureInterim: boolean = false;
  interimRepetitionquoti: boolean = false;
  interimRepetitionhebdo: boolean = false;
  users: User[] = [];
  userEntity_interim_day_monday: boolean = false;
  userEntity_interim_day_tuesday: boolean = false;
  userEntity_interim_day_wednesday: boolean = false;
  userEntity_interim_day_thursday: boolean = false;
  userEntity_interim_day_friday: boolean = false;
  userEntity_interim_day_saturday: boolean = false;
  userEntity_interim_day_sunday: boolean = false;
  startDate: Date;
  endDate?: Date;
  showEndDateCalendar: boolean = false; // Variable pour afficher le calendrier de date de fin


  filterUsername: string | null;
  filterEntite: string = '';
  filterInterimActive: boolean = false;


  nomFilter: string | '';
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient, private roleService: RoleService, private messageService: MessageService) { }
 
  
  
  
 
  ngOnInit(): void {
    // this.initializeComponent();
    console.log(this.selectedUser);
    this.loadRoles();
    this.loadModules();
 
  }

  loadModules() {
    this.roleService.getModules().subscribe({
      next: (response: any) => {
        this.modules = response.data.tt_module;
        console.log(this.modules,"load module");
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    });
  }

  isEditrMode: boolean = false;
  showAddRoleDialog() {
    this.resetNewRole();
    this.displayAddRoleDialog = true;
    this.isEditrMode = false;
    this.displayroleDetailsDialog = false;
    this.selectedRole = null;
  }

  loadSyncRoles(role: string): void {
    console.log("sync fonct", role)
    this.roleService.getSyncRoles(role).subscribe(data => {
      console.log("sync roles data")
      console.log("load sync roles ", data)
      this.syncroles = data.data.tt_roleSync;
      console.log("sync roles ", this.syncroles)
    });
  }
  deletesyncrole(): void {
    if (this.selectedSyncRole) {
      const body = {
        "tt_roleSync": [
          {
            "roleSync_id": this.selectedSyncRole.roleSync_id,
            "roleSync_roleId": this.selectedRole.role_id,
            "roleSync_roleRelated": this.selectedSyncRole.roleSync_roleRelated
          }
        ]
      };

      this.roleService.deleteSyncRole(body).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Related role deleted successfully' });
         this. loadSyncRoles(this.selectedRole.role_id); // Rafraîchit la liste des sous-rôles après suppression
        },
        error: (error) => {
          console.error('Error deleting related role:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete related role' });
        }
      });
    }
  }
  closeAddRoleDialog() {
    this.displayAddRoleDialog = false;
    this.resetNewRole();
    this.selectedRole = null;
    this.resetRoleForm();
    this.displayroleDetailsDialog = false;
  }

  roleDoubleClick() {
    this.displayroleDetailsDialog = true; // Afficher le dialogue
    this.roleFormDisabled = true; // Disable the form fields
    this.fillFormWithRoleData(this.selectedRole);
    console.log("roledisabled double clic", this.roleFormDisabled);
  }




  editRole() {
    console.log("editrole", this.selectedRole)
    if (this.selectedRole) {
      this.roleFormDisabled = false;
      console.log("roledisabled ", this.roleFormDisabled);
      this.fillFormWithRoleData(this.selectedRole);
      this.idrole = this.selectedRole.role_id;
      this.description = this.selectedRole.role_desc;
      //this.module = this.selectedRole.module
   
      this.displayAddRoleDialog = true;
      this.isEditrMode = true;
      this.cdRef.detectChanges();
    } else {
      console.error('No role selected for editing.');
    }
  }


  filterUsers() {
    console.log('Current Filters:', {
      username: this.filterUsername,
      entite: this.filterEntite,
      role: this.selectedRole
    });

    this.getUsersForRole(this.selectedRole);
  }


  // Méthode appelée lorsque vous sélectionnez un rôle
  getUsersForRole(role) {
    console.log("test getuserrole", this.filterEntite, this.filterUsername, role)
    console.log(" this.filterEntite", this.filterEntite);
    //console.log(this.filterinterim,"interim")
    const filter = this.filterEntite
      ? [
        {
          "role": role.role_id,
          "userRole": this.filterUsername,
          "entities": [
            {
              "entityId": this.filterEntite
            }
          ],
          "isInterimActive": this.filterInterimActive
        }
      ]
      : [
        {
          "role": role.role_id,
          "userRole": this.filterUsername,
          "entities": [],
          "isInterimActive": this.filterInterimActive
        }
      ];

    const body = {
      "Query": {
        "paginate": [
          {
            "numberLine": 10,
            "currentPage": 1
          }
        ],
        "filter": filter
      }
    };

    this.http.post('http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=a645cfcce0806f9cc714a38ec0f88edc', body)
      .subscribe({
        next: (data: any) => {
          console.log("test filtre ", this.filterUsername);
          this.users = data.data.ttUserEntity;
          console.log(data);
          console.log("users", this.users, "idrole", role.role_id, "this.filter", this.filterEntite)
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
      });
  }

  deleteUserRole(): void {
    if (this.selectedUser) {
      const body = {
        "ttUserEntity": [
          {
            "userEntity_entity_id": this.extractFirstPart(this.selectedUser.userEntity_entity_id).toString(),
            "userEntity_user_id": this.extractFirstPart(this.selectedUser.userEntity_user_id).toString(),
            "userEntity_role_id":this.selectedRole.role_id.toString(),
            "userEntity_id": this.selectedUser.userEntity_id
          }
        ]
      };

      this.roleService.deleteUserRole(body).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User role deleted successfully' });
          this.getUsersForRole(this.selectedRole); // Rafraîchit la liste des utilisateurs après suppression
         console.log(response)
        console.log("ttUserEntity" ,
          {
            "userEntity_entity_id": this.extractFirstPart(this.selectedUser.userEntity_entity_id).toString(),
            "userEntity_user_id": this.extractFirstPart(this.selectedUser.userEntity_user_id).toString(),
            "userEntity_role_id":this.selectedRole.role_id.toString(),
            "userEntity_id": this.selectedUser.userEntity_id
          }
        )
        },
        error: (error) => {
          console.error('Error deleting user role:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user role' });
        }
      });
    }
  }

  fillFormWithRoleData(role: any) {
    this.idrole = role.role_id;
    this.description = role.role_desc;
    this.module=role.module;
    console.log(role,"fillform")

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////ok
  onRoleSelect(role: Role) {
    if (!role || !role.idrole) {
      console.error('Invalid role object:', role, role.idrole);
      return;
    }
    console.log("onRoleSelect selectedRole", this.selectedRole);
    console.log("onRoleSelect role", role);

    this.selectedRole = role;
    this.idrole = role.idrole;
    this.description = role.role_desc;
    // this.module = Array.isArray(this.selectedRole.module) ? this.selectedRole.module : [];
   
    this.checkedsyn = !!role.synchronize; // Assuming this is a boolean
    this.displayAddRoleDialog = true;
    this.isEditMode = true;
  }


  getRoleId(role: Role | null): string | undefined {
    return role?.idrole;
  }


  displayroleDetailsDialog: boolean = false;
  // Méthode pour afficher les détails de l'utilisateur
  showRoleDetails() {
    this.displayroleDetailsDialog = true; // Afficher le dialogue
    this.fillFormWithRoleData(this.selectedRole);
  }
  deleteRole(): void {
    if (this.selectedRole) {
      const body = {
        "Query": {
          "Role": [
            {
              "id": this.selectedRole.role_id
            }
          ]
        }
      };

      this.roleService.deleteRole(body).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role deleted successfully' });
      
          this.selectedRole = null; // Reset selected role
          this.loadRoles();
        },
        error: (error) => {
          console.error('Error deleting role:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete role' });
        }
      });
    }
  }
  showUpdateRoleDialog() {
    if (this.selectedRole) {
      this.displayAddRoleDialog = true;
      this.isEditMode = true; // Enter edit mode
      console.log("showupdated selected role", this.selectedRole);
      console.log("showupdatedialog", this.selectedRole)
      this.fillFormWithRoleData(this.selectedRole);
    }
  }

  onSaveRole() {
    console.log(this.module);
    if (!this.isEditrMode) {
      const token = localStorage.getItem('token');
   
      const body = {
        "Query": {
          "Role": [
            {
              "id": this.idrole,
              "description": this.description,
              "modules": [
                {
                  "id": this.module 
                }
              ]
            }
          ]
        }
      };
      console.log("this.module", this.module);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
        'Authorization': token
      });

      this.http.post('http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=9979fb6f6fa3369cc714fd9af416f33d', body, { headers })
        .subscribe({
          next: (response) => {
            console.log('Role added successfully', response);
            console.log("body", body)
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'role ajouté ' });

          },
          error: (error) => {
            console.error('Error adding role', error);

            this.showError("Erreur d'\ajout.");
          }
        });
      this.displayAddRoleDialog = false;
      this.resetRoleForm();
      this.loadRoles();
    } else if (this.isEditrMode && this.selectedRole) {

      console.log(this.selectedRole, "selected modif")
      console.log(this.selectedRole.role_id, this.description, this.module, "données");

      this.roleService.updateRole(this.selectedRole.role_id, this.description, this.module).subscribe(
        response => {
          console.log('Rôle mis à jour avec succès:', response);
        },
        error => {
          console.error('Erreur lors de la mise à jour du rôle:', error);
          this.showError("Erreur d'\ajout.");
        }
      );
      this.loadRoles();
    } else {
      console.error('Le champ module n\'est pas une chaîne de caractères:', this.module);
    }
    this.displayAddRoleDialog = false;
    this.resetRoleForm();
    // window.location.reload();

  }
  /* console.log(this.isEditrMode)
      this.roleService.updateRole(this.selectedRole.role_id, this.description, this.module).subscribe({
        next: (response) => {
          console.log(this.selectedRole.role_id, this.description, this.module,"données ")
          console.log('Rôle mis à jour avec succès:', response);
          // Vous pouvez rafraîchir la liste des rôles ou effectuer d'autres actions ici
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du rôle:', error);
        }
      }); */
  /* const role: Role = {
     idrole: this.idrole,
     description: this.description,
     module: this.module,
     sousroles: this.sousroles,
     synchronize: this.checkedsyn,
   };
   console.log(role);
   if (this.isEditMode) {
     console.log("save", role);
     // Update existing role
     const index = this.roles.indexOf(this.selectedRole);
     if (index !== -1) {
       this.roles[index] = role;
       window.location.reload();
     }
     this.selectedRole = null;
   } else {
     // Add new role
     this.roles.push(role);
     window.location.reload();
   }

   this.saveRolesToLocalStorage();
   this.displayAddRoleDialog = false;
   this.resetRoleForm();
 }*/
  resetRoleForm() {
    this.idrole = '';
    this.description = '';
    this.module = null;
  }
  resetNewRole() {
    this.newRole = { idrole: '', description: '', module: null };
    this.newSousRole = { nom: '', synchroniser: false };
    this.synchronizer = false;
    this.selectedRole = null;
  }

  selectItem(role: Role) {
    console.log("selectedRole", this.selectedRole);
    console.log("role", role);

    this.selectedRole = role;
    console.log("Item role selected:", role.role_id);
    this.loadSyncRoles(role.role_id);

    this.getUsersForRole(this.selectedRole);
  }

  addSousRole() {
    if (this.newSousRole && this.newSousRole.nom) {
      this.sousroles.push({ ...this.newSousRole });
      this.newSousRole = { nom: '', synchroniser: false };
    } else {
      console.error('Sous-Rôle invalide');
    }
  }



  /*loadRoles() {
    this.roleService.getRoles(this.nomFilter).subscribe(
      data => {
        console.log("roles de get",data)
        if (data && data.status) {
          // Trier les menus par menu_id en ordre décroissant      module :role.tt_module_role.module_id
    
          this.roles = data.data.tt_role.map(role => ({
            ...role,
            role_id: decodeURIComponent(role.role_id),
            role_desc: decodeURIComponent(role.role_desc),
            
          }))
          console.log(this.roles)
          //this.sortMenus() 
        }
      },
      error => {
        console.error('Error fetching menus:', error);

      }
    );
  }
*/
loadRoles() {
  this.roleService.getRoles(this.nomFilter).subscribe(
    data => {
      console.log("roles de get", data);

      if (data && data.status) {
        // Créer un dictionnaire pour les associations de modules par role_id
        const moduleMap = new Map<string, number>();
        data.data.tt_module_role.forEach(moduleRole => {
          // Map module_id par role_id
          moduleMap.set(moduleRole.role_id, moduleRole.module_id);
        });

        // Mettre à jour les rôles avec les informations du module
        this.roles = data.data.tt_role.map(role => ({
          ...role,
          role_id: decodeURIComponent(role.role_id),
          role_desc: decodeURIComponent(role.role_desc),
          // Ajouter le module_id à chaque rôle
          module: moduleMap.get(role.role_id) || null
        
        }));
       
        console.log(this.roles,"this.roles");
        // Vous pouvez maintenant utiliser `this.roles` avec les informations du module associées
      }
    },
    error => {
      console.error('Error fetching roles:', error);
    }
  );
}


  //sync  roles 
  syncroles: any[] = [];
  enabled: boolean;
  roleSync_roleRelated: string;
  displayEditsyncDialog: boolean = false;
  selectedSyncRole: any;
  showEditsyncDialog() {
    if (!this.selectedSyncRole) {
      console.error('No role selected for editing');
      return;
    }
    this.fillFormWithsyncData(this.selectedSyncRole);
    this.displayEditsyncDialog = true;
  }
  selectsyncItem(role: any) {

    console.log("role", role);
    this.selectedSyncRole = role;
    //  console.log("Item role selected tst:", role.role_id);
    console.log("selectedRole sync", this.selectedSyncRole);
  }
  showAddsyncDialog() {
    this.displayEditsyncDialog = true;
  }
  fillFormWithsyncData(role) {
    this.roleSync_roleRelated = role.roleSync_roleRelated || '',
      this.enabled = role.enabled || false
  }

  showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: detail });
  }
  onsavesync() {
    if (!this.roleSync_roleRelated) {
      this.showError('Rôle Lié est obligatoire.');
      return;
    }

    //update
    if (this.selectedSyncRole) {
      const data = {
        tt_roleSync: [
          {
            roleSync_id: this.selectedSyncRole.roleSync_id,
            roleSync_roleId: this.selectedRole.role_id,
            roleSync_roleRelated: this.roleSync_roleRelated,
            enabled: this.enabled
          }
        ]
      };
      console.log(data)
      this.roleService.modifyRole(data).subscribe(
        response => {
          console.log('Rolesync updated:', response);
          this.displayEditsyncDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'role updated' });
          this.loadSyncRoles(this.selectedRole.role_id);
        },
        error => {
          this.showError('update problem.');

        });

    } else if (!this.selectedSyncRole) {
      //add new sync
      const data = {
        tt_roleSync: [
          {
            roleSync_roleId: this.selectedRole.role_id,
            roleSync_roleRelated: this.roleSync_roleRelated,
            enabled: this.enabled
          }
        ]
      };

      this.roleService.addRole(data).subscribe(
        response => {
          console.log('Role added:', response);
          this.displayEditsyncDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'role ajouté' });
          this.loadSyncRoles(this.selectedRole.role_id);
          console.log(this.selectedRole)
        },
        error => {
          this.showError("Erreur d'\ajout.");

        });
    }
  }


  // Partie utilisateur
  displayAddUserDialog = false;

  showAddUserDialog() {
    this.resetForm();
    this.userFormDisabled = false;
    this.displayAddUserDialog = true;
    console.log("add dialog", this.selectedRole)
  }

  onuserDoubleClick() {
    this.displayUserDetailsDialog = true; // Afficher le dialogue
    this.userFormDisabled = true; // Disable the form fields
    this.showUserDetails()
  }
  displayUserDetailsDialog: boolean = false;
  // Méthode pour afficher les détails de l'utilisateur
  showUserDetails() {
    // this.selectedUser = user; // Préremplir le formulaire avec les données de l'utilisateur sélectionné
    this.fillFormWithUserData(this.selectedUser);
    // console.log("display",this.displayUserDetailsDialog);
    console.log("user display", this.selectedUser);
  }
  closeAddUserDialog() {
    this.displayAddUserDialog = false;
    this.resetForm();
    this.selectedUser = null;
    this.displayUserDetailsDialog = false;

  }
  isEditMode: boolean = false;

  onSaveUser() {
    console.log(this.isEditMode)

    if (this.isEditMode && this.selectedUser) {
console.log(this.interimRepetitionquoti,"interimRepetitionquoti",this.interimRepetitionhebdo,"this.interimRepetitionhebdo")
      // Mettre à jour l'utilisateur existant
      const userData = {
        "ttUserEntity": [
          {
            "userEntity_entity_id": this.entite,
            "userEntity_user_id": this.username,
            "userEntity_role_id": this.selectedRole.role_id,
            "userEntity_interim": this.interim,
            "userEntity_id": this.selectedUser.userEntity_id,
            "userEntity_interim_active": this.configureInterim,
            "is_seat": this.accessSiege,
            "userEntity_interim_active_logic": this.showEndDateCalendar,
            "userEntity_interim_start_date": this.startDate?this.startDate.toISOString() : null ,
            "userEntity_interim_end_date_logi": this.showEndDateCalendar,
            "userEntity_interim_end_date": this.endDate ? this.endDate.toISOString() : null,
            "userEntity_interim_quotidien": this.interimRepetitionquoti,
            "userEntity_interim_hebdomadaire": this.interimRepetitionhebdo,
            "userEntity_interim_day_monday": this.userEntity_interim_day_monday,
            "userEntity_interim_day_tuesday": this.userEntity_interim_day_tuesday,
            "userEntity_interim_day_wednesday": this.userEntity_interim_day_wednesday,
            "userEntity_interim_day_thursday": this.userEntity_interim_day_thursday,
            "userEntity_interim_day_friday": this.userEntity_interim_day_friday,
            "userEntity_interim_day_saturday": this.userEntity_interim_day_saturday,
            "userEntity_interim_day_sunday": this.userEntity_interim_day_sunday

          }
        ]
      };
      console.log("this.entite", this.entite, "this.interim", this.interim, this.configureInterim, "quoti", this.interimRepetitionquoti, "hebdo", this.interimRepetitionhebdo, this.showEndDateCalendar, "this.showEndDateCalendar",typeof(this.startDate )) ; // "boolean");

      console.log("update entered", this.selectedRole.role_id, this.selectedUser.userEntity_user_id, "interim", this.interim)
      
      this.roleService.updateUser(userData).subscribe(
        
        response => {
        console.log("userData", userData);

          console.log('User updated successfully:', response);
          this.closeAddUserDialog(); // Fermer la boîte de dialogue après la mise à jour
          this.getUsersForRole(this.selectedRole);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else if (!this.isEditMode) {
      // Ajouter un nouvel utilisateur
      console.log(this.selectedRole, "selecttttttttt")
      const selectedRoleId = this.selectedRole.role_id;

      const userData = {
        "tt_userEntity": [
          {
            "userEntity_entity_id": this.entite,
            "userEntity_user_id": this.username,
            "userEntity_role_id": selectedRoleId,
            "userEntity_interim": this.interim ? 'ROOT' : null,
            "userEntity_interim_active": this.configureInterim,
            "is_seat": this.accessSiege,
            "userEntity_interim_active_logic": false,
            "userEntity_interim_start_date": this.startDate,
            "userEntity_interim_end_date_logi": this.showEndDateCalendar,
            "userEntity_interim_end_date": this.endDate ? this.endDate.toISOString() : null,
            "userEntity_interim_quotidien": this.interimRepetitionquoti,
            "userEntity_interim_hebdomadaire": this.interimRepetitionhebdo,
            "userEntity_interim_day_monday": this.userEntity_interim_day_monday,
            "userEntity_interim_day_tuesday": this.userEntity_interim_day_tuesday,
            "userEntity_interim_day_wednesday": this.userEntity_interim_day_wednesday,
            "userEntity_interim_day_thursday": this.userEntity_interim_day_thursday,
            "userEntity_interim_day_friday": this.userEntity_interim_day_friday,
            "userEntity_interim_day_saturday": this.userEntity_interim_day_saturday,
            "userEntity_interim_day_sunday": this.userEntity_interim_day_sunday
          }
        ]
      };
      console.log(userData, "userdata")
      this.roleService.addUser(userData).subscribe(response => {
        console.log('User added successfully:', response);
        this.closeAddUserDialog();
        this.getUsersForRole(this.selectedRole);
      }, error => {
        console.error('Error adding user:', error);
      });
    }


    this.displayAddUserDialog = false;
    this.resetForm();
    this.selectedUser = null;
  }


  resetForm() {
    this.username = '';
    this.entite = '';
    this.interim = '';
    this.accessSiege = false;
    this.configureInterim = false;
    this.interimRepetitionhebdo = false;
    this.interimRepetitionquoti = false;
    this.userEntity_interim_day_monday = false;
    this.userEntity_interim_day_tuesday = false;
    this.userEntity_interim_day_wednesday = false;
    this.userEntity_interim_day_thursday = false;
    this.userEntity_interim_day_friday = false;
    this.userEntity_interim_day_saturday = false;
    this.userEntity_interim_day_sunday = false;
    this.startDate = null;
    this.endDate = null;
    this.showEndDateCalendar = false;
  }

  showUpdateUserDialog() {
    if (this.selectedUser) {
      this.displayAddUserDialog = true;
      this.isEditMode = true; // Passer en mode édition
      this.fillFormWithUserData(this.selectedUser);
      this.userFormDisabled = false;

      console.log(this.selectedUser, "username");
      console.log(this.selectedUser, this.isEditMode, "update user dialog");
    }
  }

  /*fillFormWithUserData(user: User) {
    this.username = user.username;
    this.entite = user.entite;
    this.interim = user.interim;
    this.accessSiege = user.accessSiege;
    this.configureInterim = user.configureInterim;
    this.interimRepetition = user.interimRepetition;
    this.selectedDays = { ...user.selectedDays };
    this.startDate = user.startDate ? new Date(user.startDate) : null;
    this.endDate = user.endDate ? new Date(user.endDate) : null;
    this.showEndDateCalendar = !!user.endDate; // Afficher le calendrier si une date de fin est définie
  } */
  extractFirstPart(text: string): string {
    const parts = text.split(' - ');
    return parts[0];
  }
  userEntity_interim_end_date_logi: boolean;
  ondatelogChange(isYes: boolean): void {
    //this.userEntity_interim_end_date_logi = isYes; //Définit true ou false selon la sélection
    this.showEndDateCalendar = isYes; // Affiche le calendrier de date de fin si "Oui" est sélectionné
    console.log('Valeur de userEntity_interim_end_date_logi:', this.showEndDateCalendar, isYes);
  }
  onInterimRepetitionChange(rep:string){
    if (rep ==='hebdo'){
      this.interimRepetitionquoti=false
    }else {
      this.interimRepetitionhebdo=false
    }

  }
  fillFormWithUserData(user) {
   
    this.username = this.extractFirstPart(user.userEntity_user_id) || '';
    this.entite = this.extractFirstPart(user.userEntity_entity_id) || '';
    this.interim = this.extractFirstPart(user.userEntity_interim) || '';
    this.accessSiege = user.is_seat || false;
    this.configureInterim = user.userEntity_interim_active || false;
    this.interimRepetitionhebdo = user.userEntity_interim_hebdomadaire || false;
    this.interimRepetitionquoti = user.userEntity_interim_quotidien || false;
    this.userEntity_interim_day_monday = user.userEntity_interim_day_monday || false;
    this.userEntity_interim_day_tuesday = user.userEntity_interim_day_tuesday || false;
    this.userEntity_interim_day_wednesday = user.userEntity_interim_day_wednesday || false;
    this.userEntity_interim_day_thursday = user.userEntity_interim_day_thursday || false;
    this.userEntity_interim_day_friday = user.userEntity_interim_day_friday || false;
    this.userEntity_interim_day_saturday = user.userEntity_interim_day_saturday || false;
    this.userEntity_interim_day_sunday = user.userEntity_interim_day_sunday || false;

    this.startDate =  user.userEntity_interim_start_date || null;
    this.endDate = this.endDate ? new Date(user.userEntity_interim_end_date) : null;
    this.showEndDateCalendar = user.userEntity_interim_end_date_logi || false;
    console.log(user, "user.userEntity_interim_end_date_logi", user.userEntity_interim_end_date_logi)
  }

  /*user.userEntity_interim_hebdomadaire === 'yes' ? 'yes' : 'no'
  resetUserForm() {
    this.username = '';
    this.entite = '';
    this.interim = '';
    this.accessSiege = false;
    this.configureInterim = false;
    this.interimRepetitionhebdo = false;
    this.interimRepetitionquoti = false;

    this.selectedDays = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    };
    this.startDate = undefined;
    this.endDate = undefined;
    this.showEndDateCalendar = false;
  }*/

  /*onDayChange(day: string, isChecked: boolean) {
    this.selectedDays[day] = isChecked;
  }*/





  onAccesSiegeChange(user: User, checked: boolean) {
    user.is_seat = checked;
    console.log("usersiege ")
    //this.updateUser(user);
  }

  onConfigInterimChange(user: User, checked: boolean) {
    user.userEntity_interim_active = checked;
    //this.updateUser(user);
  }

  /*updateUser(user: User) {
    console.log(user)
    const userIndex = this.users.findIndex(u => u.username === user.username);
    if (userIndex !== -1) {
      this.users[userIndex] = user;
      this.saveUsersToLocalStorage();
    }
  }*/

  onRowSelect(user) {
    this.selectedUser = user;
    console.log(this.selectedUser, "onrowselect");
  }
  selectedUser: User | null = null; // Variable pour stocker l'utilisateur sélectionné




  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    const isButtonClicked = targetElement.closest('.button-container button');
    const isFormClicked = targetElement.closest('.user-container');
    const isButtonClickedsaverole = targetElement.closest('.save-btnROLE button');
    const isButtonClicked3 = targetElement.closest('.form_user');
    const isButtonClicked33 = targetElement.closest('.userformbtn button');
    const isButtonClicked2 = targetElement.closest('.form-role');
    const isbtnrole = targetElement.closest('.btn-role button');
    const isFormClickedrole = targetElement.closest('.menu-container');
    const isInputClicked = targetElement.tagName === 'p-checkbox';
    const isFormsyncrole = targetElement.closest('.syncroles');
    const isButtonsync = targetElement.closest('.btn-sync button');
    const isFormClickedsousrole = targetElement.closest('.sousroles');
   

    if (!isButtonClicked && !isFormClicked && !isButtonClicked3) {
      this.selectedUser = null;
    }
    if (!isbtnrole && !isFormsyncrole && !isButtonClicked2 && !isButtonClicked3 && !isButtonClicked33 && !isButtonsync && !isFormClicked && !isButtonClickedsaverole && !isFormClickedrole && !isInputClicked && !isFormClickedsousrole && !isButtonClicked) {
      this.selectedRole = null;
    }
  }


}
