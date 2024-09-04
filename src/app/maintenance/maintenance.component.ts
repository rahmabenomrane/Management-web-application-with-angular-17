import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuService } from '../menu.service';
import { PaginatorModule } from 'primeng/paginator';
import { TreeTableModule } from 'primeng/treetable';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';

interface Typet {
  name: string;
  code: string;
}
export interface FilterCriteria {
  menuId?: number;
  module?: string;
  menu_nbr?: number;
  menu_name?: string;
}
interface Menu {
  menu_id: number | null;
  menu_exec: string;
  menu_name: string;
  menu_label: string;
  menu_type: string;
  menu_nbr: number;
  menu_select: boolean;
  menu_module: string;
  menu_universal_access: boolean;
  menu_f1: string | null;
  menu_f2: string;
  menu_forapp: string;
  menu_icon: string;
  menu_iconType: string;
  menu_router: string;
  newplatform: boolean;
}

interface MenuResponse {
  ttMenu: Menu[];
}



@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [HttpClientModule,TranslateModule, ScrollPanelModule, DialogModule, ToastModule, ScrollTopModule, CheckboxModule, TableModule, TreeTableModule, PaginatorModule, CommonModule, OrderListModule, ButtonModule, FormsModule, InputTextModule, DropdownModule, InputNumberModule],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  providers: [MenuService, MessageService]
})

export class MaintenanceComponent implements OnInit {
  id: number | undefined;
  nombreMenu: string | undefined;
  module: number | undefined;
  selection: number | undefined;
  nom: string | undefined;
  accesUniversel: string | undefined;
  selectedtype: string | undefined;
  libelle: string | undefined;
  procedureExecuter: string | undefined;
  typeAcces: string | undefined;
  identifiantProcessus: string | undefined = "cc9259a2df493dbe9314c53fe8fdd902";
  newplatform: boolean = false;
  infos: any[] = [];
  displayAdduserDialog: boolean = false;
  isEditing = false;
  selectedItem: any = null;
  show = false;
  rolestt: any[];
  infostest: any[];
  menuAccess_user_id: string;
  menuAccess_menu_id: number | null;
  menuAccess_canRun: boolean | false;
  menuAccess_role_id: string | null;
  moduleFilter: string | null;
  nomFilter: string | null;
  nombreMenuFilter: number | null;
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient, private menuService: MenuService, private messageService: MessageService) {

  }
  menus: any[] = [];
  displayedMenus: any[] = [];

  ngOnInit(): void {

    this.loadMenus();

    this.loadUsersFromLocalStorage();

  }



  loadMenus() {
    this.menuService.getMenus(this.moduleFilter, this.nombreMenuFilter, this.nomFilter).subscribe(
      data => {
        if (data && data.status) {
          // Trier les menus par menu_id en ordre décroissant
          this.menus = data.data.ttMenu.map(menu => ({
            ...menu,
            menu_name: decodeURIComponent(menu.menu_name),
          }))
          console.log(this.menus)
          this.sortMenus()

        }
      },
      error => {
        console.error('Error fetching menus:', error);


      }
    );
  }
  //add user menu
  addUserDialogVisible: boolean = false;
  newUser = {
    menuAccess_user_id: '',
    menuAccess_menu_id: null,
    menuAccess_canRun: false,
    menuAccess_role_id: ''
  };
  showAddUserDialog() {
    this.addUserDialogVisible = true;
  }

  addUser() {
    const token = localStorage.getItem('token');
    
    if (!this.menuAccess_user_id || !this.selectedItem || !this.selectedItem.menu_id) {
      console.error('Invalid data for adding user.');
      return;
    }
  
    const newEntry = {
      tt_menuAccess: [{
        "menuAccess_user_id": this.menuAccess_user_id,
        "menuAccess_menu_id": this.selectedItem.menu_id,
        "menuAccess_canRun": this.menuAccess_canRun ? true : false,
        "menuAccess_role_id": this.menuAccess_role_id
      }]
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);
  
    this.http.post('http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=a07bce9e5301078dc714de2da89e34a2', newEntry, { headers })
      .subscribe(
        response => {
          console.log('User added:', response, this.selectedItem, newEntry);
          
          // Charger les utilisateurs existants depuis le local storage
          const storedUsers = localStorage.getItem('usersmenu');
          let users = storedUsers ? JSON.parse(storedUsers) : [];
          
          // Ajouter le nouvel utilisateur à la liste
          users.push({
            "menuAccess_user_id": this.menuAccess_user_id,
            "menuAccess_menu_id": this.selectedItem.menu_id,
            "menuAccess_canRun": this.menuAccess_canRun ? true : false,
            "menuAccess_role_id": this.menuAccess_role_id
          });
  
          // Mettre à jour le local storage avec la liste mise à jour
          localStorage.setItem('usersmenu', JSON.stringify(users));
  
          this.addUserDialogVisible = false; // Fermez la boîte de dialogue
          this.resetFormuser();
          this.loadUsersFromLocalStorage();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User added successfully' });
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
  }
  
  users: any[] = [];
  filteredUsers: any[] = [];
  loadUsersFromLocalStorage() {
    const storedUsers = localStorage.getItem('usersmenu');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.filteredUsers = this.users.filter(user => user.menuAccess_menu_id === this.selectedItem.menu_id);
      console.log("Filtered users:", this.filteredUsers);
    } else {
      this.users = [];
      this.filteredUsers = [];
    }
  }
  selecteduser: any;

  selectuser(user: any) {
    console.log("user", user);
    this.selecteduser = user;
    console.log("selecteduser sync", this.selecteduser);
  }


//delete user 
  deleteUser(selectedUser) {
    const token = localStorage.getItem('token');
    console.log(selectedUser,"selected user")

    const deleteEntry = {
      tt_menuAccess: [{
        "menuAccess_user_id": selectedUser.menuAccess_user_id,
        "menuAccess_menu_id": selectedUser.menuAccess_menu_id,
        "menuAccess_role_id": selectedUser.menuAccess_role_id
      }]
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);
  
    this.http.post('http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=cd973a711a23a880c714dd2dd8c12910', deleteEntry, { headers })
      .subscribe(
        response => {
          console.log('User deleted response :', response);
          
          // Supprimez l'utilisateur du local storage
          const storedUsers = localStorage.getItem('usersmenu');
          console.log(storedUsers);
          if (storedUsers) {
            let users = JSON.parse(storedUsers);
            users = users.filter(user => user.menuAccess_user_id !== selectedUser.menuAccess_user_id || user.menuAccess_menu_id !== selectedUser.menuAccess_menu_id || user.menuAccess_role_id !== selectedUser.menuAccess_role_id);
            console.log(users,"users")
            // Mettre à jour le local storage avec la liste mise à jour
            localStorage.setItem('usersmenu', JSON.stringify(users));
            
            // Mettre à jour les utilisateurs affichés
            this.loadUsersFromLocalStorage();
  
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
          }
        },
        error => {
          console.error('Error deleting user:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
        }
      );
  }
  

  resetFormuser() {
    this.menuAccess_user_id = '';
    this.menuAccess_menu_id = null;
    this.menuAccess_canRun = false;
    this.menuAccess_role_id = ''

  }




  private apiUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=cd973a711a23a880c7148a2d0c95f468';

  onSave() {
    const token = localStorage.getItem('token');
    const newEntry = {
      "ttMenu": [{
        "menu_id": null,
        "menu_exec": this.procedureExecuter,
        "menu_name": this.nom,
        "menu_label": this.libelle,
        "menu_type": this.selectedtype,
        "menu_nbr": this.nombreMenu,
        "menu_select": this.selection,
        "menu_module": this.module,
        "menu_universal_access": this.accesUniversel,
        "menu_f1": null,
        "menu_f2": "",
        "menu_forapp": "cc9259a2df493dbe9314c53fe8fdd902",
        "RecordId": "",
        "RecordCreateDate": "",
        "RecordUpdateDate": "",
        "menu_icon": this.typeAcces,
        "menu_iconType": "",
        "menu_router": "",
        "newplatform": this.newplatform,
      }]
    };


    if (!this.isEditing) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
        'DEVICE-ID': 'web',
      }).set('Authorization', token);

      this.http.post<MenuResponse>(this.apiUrl, newEntry, { headers }).subscribe(
        response => {
          console.log('Response:', response);
          if (response && response.ttMenu && response.ttMenu.length > 0) {
            const addedMenu = response.ttMenu[0];
            // Ajout du nouveau menu dans la liste
            this.menus.unshift({
              ...addedMenu,
              menu_name: decodeURIComponent(addedMenu.menu_name),
            });

          } else {
            console.warn('Invalid response structure or ttMenu is empty');
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Related role add successfully' });
          this.loadMenus();
          this.resetForm();
        },
        error => {
          console.error('Error adding menu:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add user role' });
        }
      );
      console.log("newEntry", newEntry, "this.newplatform", this.newplatform,);
    }
    else {
      const newEntry = {
        "ttMenu": [{
          "menu_id": this.selectedItem.menu_id,
          "menu_exec": this.procedureExecuter,
          "menu_name": encodeURIComponent(this.nom), // Encodage des caractères spéciaux 
          "menu_label": this.libelle,
          "menu_type": this.selectedtype,
          "menu_nbr": this.nombreMenu,
          "menu_select": this.selection,
          "menu_module": this.module,
          "menu_universal_access": this.accesUniversel,
          "menu_f1": null,
          "menu_f2": "",
          "menu_forapp": "cc9259a2df493dbe9314c53fe8fdd902",
          "RecordId": "",
          "RecordCreateDate": "",
          "RecordUpdateDate": "",
          "menu_icon": this.typeAcces,
          "menu_iconType": "",
          "menu_router": this.procedureExecuter,
          "newplatform": this.newplatform,
        }]
      }
      console.log("newEntry", newEntry, "this.newplatform", this.newplatform,);
      this.loadMenus();
      this.updateSelectedItem(newEntry);
    }

  }
  sortMenus() {
    this.menus.sort((a, b) => {
      return b.menu_id - a.menu_id;
    });

  }

  updateSelectedItem(updatedEntry: any) {
    const token = localStorage.getItem('token');
    const updateApiUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=b4cda1e0efa542a5c714bb2d9cef12c0';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APP-ID': 'cc9259a2df493dbe9314c53fe8fdd902',
      'DEVICE-ID': 'web',
    }).set('Authorization', token);

    this.http.post(updateApiUrl, updatedEntry, { headers })
      .subscribe(
        response => {
          console.log('Menu updated successfully:', response);
          console.log(updatedEntry)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Related menu updated successfully' });
          this.loadMenus();
        },
        error => {
          console.error('Error updating menu:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update menu' });
        }
      );

    this.isEditing = false;
    this.resetForm();
  }


  onClear() {
    this.resetForm();
    this.selectedItem = null;
    this.isEditing = false;
  }

  onEdit() {
    if (this.selectedItem) {
      this.setFormValues(this.selectedItem);
      this.isEditing = true;
      this.show = true;
      console.log("this.selectItem", this.selectItem);
    }
  }


  onDelete() {
    this.menuService.deleteMenu(this.selectedItem.menu_id).subscribe(
      response => {
        console.log('Menu deleted successfully:', response);
        // Réactualiser la liste des menus ou faire autre chose après suppression
        this.loadMenus();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Related menu deleted successfully' });
        this.resetForm();
      },
      error => {
        console.error('Error deleting menu:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete menu' });
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          console.error('Client-side error:', error.error.message);
        } else {
          // Erreur côté serveur
          console.error(`Server returned code ${error.status}, body was: ${error.error}`);
        }
      }
    );
  }


  selectItem(info: any) {
    console.log("selected", info)
    console.log("selected type", info.menu_type)
    this.selectedtype = info.menu_type
    console.log("this.selectedtype", this.selectedtype);

    this.selectedItem = info;
    this.isEditing = true;
    console.log("info", info);
    this.loadUsersFromLocalStorage();
    this.setFormValues(info);
  }

  // Méthode de filtrage
  // Variables de filtre
  displayedInfos: any[] = [];
  // Méthode de filtrage
  filterInfos() {
    let filteredInfos = this.menus;
    //console.log("this.menus", this.menus)
    // Filtre par module
    if (this.moduleFilter) {
      filteredInfos = filteredInfos.filter(info => info.menu_module == this.moduleFilter);
    }
    // Filtre par nom
    if (this.nomFilter) {
      console.log(this.nomFilter);
      filteredInfos = filteredInfos.filter(info =>
        info.menu_name === this.nomFilter);
    }
    // Filtre par nombre de menu
    if (this.nombreMenuFilter !== undefined) {
      filteredInfos = filteredInfos.filter(info => info.menu_nbr === this.nombreMenuFilter);
    }

    //console.log('Filtered Infos:', filteredInfos);


    return filteredInfos;
  }







  onClickOutside() {
    this.selectedItem = null;
    this.isEditing = false;
    this.cdRef.detectChanges();
    this.resetForm();
  }

  reloadPage() {
    window.location.reload();
  }

  resetForm() {
    this.nombreMenu = undefined;
    this.module = undefined;
    this.selection = undefined;
    this.nom = undefined;
    this.accesUniversel = undefined;
    this.selectedtype = undefined;
    this.libelle = undefined;
    this.procedureExecuter = undefined;
    this.typeAcces = undefined;
    this.identifiantProcessus = undefined;
  }

  setFormValues(item: any) {
    console.log("item", item);

    this.nombreMenu = item.menu_nbr;
    this.module = item.menu_module;
    this.selection = item.menu_select;
    this.nom = item.menu_name;
    this.accesUniversel = item.menu_universal_access;
    this.selectedtype = item.menu_type;
    this.libelle = item.menu_label;
    this.procedureExecuter = item.menu_exec;
    this.typeAcces = item.menu_icon;
    this.identifiantProcessus = item.menu_forapp;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    const isInsideMenu = targetElement.closest('.menu-container');
    const isButtonClicked = targetElement.closest('.button-container button');
    const isFormClicked = targetElement.closest('.form-container');
    const isButtonClickeduser = targetElement.closest('.btn-role button');
    const isInsideMenuuser = targetElement.closest('.user-container');
    if (!isInsideMenu && !isButtonClicked && !isFormClicked && this.selectedItem) {
      this.onClickOutside();
      this.selectedItem = null;
    }
    if(!isButtonClickeduser && !isInsideMenuuser){
        this.selecteduser = null;
    }
  }



}
