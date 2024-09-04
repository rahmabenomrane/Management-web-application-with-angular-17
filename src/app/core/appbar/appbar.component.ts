import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { IframesComponent } from '../../shared/iframes/iframes.component';

import { StyleClassModule } from 'primeng/styleclass';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

import { MenuService } from '../services/menu.service';
import { LayoutService } from '../services/layout.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { ScrollerModule } from 'primeng/scroller';
import { InputIconModule } from 'primeng/inputicon';
import * as Quill from 'quill';
import { TranslateService, TranslateModule , LangChangeEvent} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem as PrimeMenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Console } from 'console';
import { Subscription } from 'rxjs';

interface MenuItem {
    menuId: string;
    menuName: string;
    menuParent: string;
    children: MenuItem[];
}

@Component({
    selector: 'app-bar',
    templateUrl: './appbar.component.html',
    styleUrls: ['./appbar.component.css'],
    standalone: true,
    imports: [InputIconModule,ScrollerModule, IconFieldModule, CommonModule, FormsModule, StyleClassModule, IframesComponent, SidebarModule, ButtonModule, InputTextModule, AvatarModule, RouterModule, RouterOutlet, TranslateModule, TieredMenuModule],
})

export class AppBarComponent {
    langChangeSub: Subscription;
    items: PrimeMenuItem[];
    debug: 'error' | 'info' | 'warn' | 'log' | boolean = 'info';
    token: string | null;
    iframeUrl: string | null;
    iframeId: string | null;
    fullName: string | null;
    iconClass: string | null;
    userId: string | null;
    username: string | null;
    feature: string | null;

    showFavorites: boolean = false;
    showPinned: boolean = false;
    sidebarVisible: boolean = false;
    activeHome: boolean = true;
    activeMenu: boolean = false;
    activeModule: boolean = true;
    isActive: boolean = false;

    menuItems: any[] = [];
    moduleItems: any[] = [];
    pinnedItems: any[] = [];
    pinned: any[] = [];
    levelOneMenus: any[] = [];
    favoritedItems: any[] = [];
    itemsmenu: any[];
    userModules: any[] = [];
    favoriteModules: MenuItem[] = [];
    levelTwoMenus: any[] = [];
    rootMenus: any[] = [];
    BarModules: any[] = [];
    constructor(private layoutService: LayoutService,
        private userService: UserService,
        private authService: AuthService,
        private menuService: MenuService,
        private router: Router,
        private http: HttpClient,
       private translate: TranslateService
    ) {
        this.debug = 'info';
        this.itemsmenu = [
            {
                label: 'Inbox',
                icon: 'fa-solid fa-inbox',
                routerLink: '/inbox'
            },
            {
                label: 'Tableau de bord',
                icon: 'fa-solid fa-chart-pie',
                routerLink: '/dashboard'
            },
            {
                label: 'Process à démarrer',
                icon: 'pi pi-arrow-up-right',
                routerLink: '/start-process'
            },
            {
                label: 'Applications téléchargées',
                icon: 'pi pi-microsoft',
                routerLink: '/app-appdownloaded'
            }
        ];
    }

    private apiUrl = 'http://102.164.112.38/scripts/grc.wsc/WService=ws-pgh-P230326/msp/sys/api.p?service=834444a6eaa2e186c71435ade02f12e3';
    loadModules(): void {
        const body = {
            Query: {
                paginate: [
                    {
                        numberLine: 10,
                        currentPage: 1
                    }
                ],
                filter: [
                    {
                        module: ""
                    }
                ]
            }
        };

        this.http.post<any>(this.apiUrl, body).subscribe(response => {
            if (response.status) {
                this.userModules = response.data.tt_module;
                console.log(response)
            }
        });
    }



    //ajouter maintenance menu au menu à gauche
    addMaintenanceMenuItem() {
        const maintenanceMenuItem: any = {
            label: 'Maintenance',
            icon: 'pi pi-wrench',
            routerLink: '/maintenance'
        };

        // Vérifier si l'élément "Maintenance" existe déjà dans itemsmenu
        const exists = this.itemsmenu.some(item => item.label === 'Maintenance');

        // Ajouter l'élément "Maintenance" seulement s'il n'existe pas déjà
        if (!exists) {
            this.itemsmenu.push(maintenanceMenuItem);
        }
    }


    maintenanceMenuClicked() {
        // Appeler la méthode pour ajouter l'élément "Maintenance"
        this.addMaintenanceMenuItem();
    }
  
    ngOnInit() {

        this.token = this.authService.getToken();
        this.fullName = this.userService.getFullName();
        this.userId = localStorage.getItem('username');

    
        this.getModules();

        this.getUserFavoriteMenu();
        this.getUserFavoriteModule();


        this.loadMenuItems();

    // Abonnez-vous au changement de langue
    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.loadMenuItems(); // Recharge les éléments du menu avec la nouvelle langue
      });
        this.loadModules();

        /* this.router.navigate(['']); */
    }
    loadMenuItems() {
        this.translate.get([
          'ADMIN_TOOLS', 
          'USER_MANAGEMENT', 
          'ROLE_MAINTENANCE', 
          'MENU_MAINTENANCE', 
          'PROCESS_HISTORY', 
          'GENERAL_SETTINGS_MAINTENANCE',
          'ENTITY_MAINTENANCE',
          'WORKFLOW_MANAGEMENT',
          'MODULE_MAINTENANCE',
          'CALENDAR_MAINTENANCE'
        ]).subscribe(translations => {
          this.items = [
            {
              label: translations['ADMIN_TOOLS'],
              icon: 'pi pi-file',
              items: [
                {
                  label: translations['USER_MANAGEMENT'],
                  icon: 'pi pi-plus',
                  command: () => {
                    this.router.navigate(['/gestuti']);
                    this.addMaintenanceMenuItem();
                  }
                },
                {
                  label: translations['ROLE_MAINTENANCE'],
                  icon: 'pi pi-folder-open'
                },
                {
                  label: translations['MENU_MAINTENANCE'],
                  icon: 'pi pi-print',
                  command: () => {
                    this.router.navigate(['/maintenance']);
                    this.addMaintenanceMenuItem();
                  }
                },
                {
                  label: translations['PROCESS_HISTORY'],
                  icon: 'pi pi-print'
                },
                {
                  label: translations['GENERAL_SETTINGS_MAINTENANCE'],
                  icon: 'pi pi-print'
                },
                {
                  label: translations['ENTITY_MAINTENANCE'],
                  icon: 'pi pi-print'
                }
              ]
            },
            {
              label: translations['WORKFLOW_MANAGEMENT'],
              icon: 'pi pi-file-edit',
              items: [
                {
                  label: translations['MODULE_MAINTENANCE'],
                  icon: 'pi pi-copy'
                },
                {
                  label: translations['CALENDAR_MAINTENANCE'],
                  icon: 'pi pi-times'
                }
              ]
            }
          ];
        });
      }


    /*********** appbar grid and list*/

    displayAsList: boolean = false;
    searchString: string = '';
    filteredModules: MenuItem[] = [];
    showList: boolean = false;
    searchClicked: boolean = false;
    selectedModule: any = null;
    sidebarVisibleB: boolean = false; // État de la sidebar
    selectedModuleName: string = ''; // Nom du module sélectionné


    handleButtonClick() {
        console.log('Hello World');
    }


    onSearch(searchValue: string) {
        this.searchString = searchValue.toLowerCase();
        this.searchClicked = true; // Indiquer que la recherche a été cliquée
        if (this.searchString) {
            this.filterModules();
            this.showList = true; // Afficher en liste lorsqu'il y a du texte dans la recherche
        } else {
            this.showList = true; // Afficher en grille si la recherche est vide
            this.filteredModules = [...this.userModules]
        }
    }

    initializeEditor() {
        const quillOptions: Quill.QuillOptions = {
            modules: { toolbar: '#toolbar-container' },
            placeholder: 'Compose an epic...',
            readOnly: false,
            theme: 'snow',
            formats: ['bold', 'italic', 'underline', 'strike', 'link'],
            bounds: '#editor-container',
            debug: this.debug
        };


    }

    ngAfterViewInit() {
        this.initializeEditor();
    }

    filterModules() {
        this.filteredModules = this.userModules.filter(module =>
            module.moduleName.toLowerCase().includes(this.searchString)
        );
    }

    toggleView() {
        this.showList = !this.showList;
        this.searchClicked = false; // Réinitialiser l'état de recherche lors du retour à la vue en grille
        this.searchString = ''
        this.filteredModules = []; // Réinitialiser les modules filtrés

    }

    selectModule(item: any) {
        this.selectedModule = item;
    }
    toggleFavoriteModuleQ(module: any) {
        const index = this.favoriteModules.indexOf(module);
        if (index > -1) {
            this.favoriteModules.splice(index, 1);
        } else {
            this.favoriteModules.push(module);
        }

    }


    // Fonction pour ajouter ou supprimer un module dans BarModules (verticalement)
    toggleBarModuleQ(module: any): void {
        console.log(module,"module",this.BarModules,"barmodules")
        // Trouver l'index du module dans BarModules
        const index = this.BarModules.findIndex(m => m.module_id === module.module_id);
        console.log(this.BarModules, "barmodules")
        if (index > -1) {
            // Le module est déjà dans BarModules, donc le supprimer
            this.BarModules.splice(index, 1);
            console.log(this.BarModules);
        } else {
            // Le module n'est pas dans BarModules, donc l'ajouter
            this.BarModules.push(module);
        }
        this.sidebarVisible=true;
        // Afficher BarModules pour vérifier les mises à jour
        console.log(this.BarModules);
    }

    hoveredModule: any = null;
    showSidebarB(event: MouseEvent, module: any) {

        if (module && module.module_name) {
            this.sidebarVisibleB = true; // Affiche la sidebar
            this.selectedModuleName = module.module_name
        } else {
            console.error('Module is undefined or missing moduleName property');
        }
    }

    hideSidebarB(event: MouseEvent) {
        // Vérifie si la souris est toujours dans le module ou dans la sidebar
        this.sidebarVisibleB = false; // Cache la sidebar
        this.hoveredModule = null;

    }

    onSidebarMouseEnter(event: MouseEvent) {
        this.sidebarVisibleB = true;
        console.log('sidebarVisibleB:', this.sidebarVisibleB);
        console.log('appbar width:', document.querySelector('.appbar').clientWidth);
    }

    onSidebarMouseLeave(event: MouseEvent) {

        this.sidebarVisibleB = false; // Cache la sidebar
        this.hoveredModule = null;

    }

    @ViewChild('maintMenu') maintMenu: any; // Référence au menu PrimeNG


    toggleMenumaintenance(event: MouseEvent) {
        this.maintMenu.toggle(event);
    }

    

    getModules(): void {
        const storedData = localStorage.getItem('moduleItems');

        if (!storedData) {
            const token = this.authService.getToken();
            if (token) {
                this.menuService.getMenusAndModules(token).subscribe(
                    (response) => {
                        if (response.data && response.data.module) {
                            this.moduleItems = response.data.module.map(moduleItem => ({
                                moduleId: moduleItem.module_id,
                                moduleName: moduleItem.module_name,
                                moduleParent: moduleItem.module_parent,
                                moduleParentName: moduleItem.module_ParentName,
                                moduleCode: moduleItem.module_code,
                                moduleDesc: moduleItem.module_desc,
                                moduleIcon: moduleItem.module_icon,
                                moduleIconType: moduleItem.module_iconType,
                                isApplication: moduleItem.isApplication,
                            }));

                            localStorage.setItem('moduleItems', JSON.stringify(this.moduleItems));

                            this.userModules = this.moduleItems ? this.moduleItems.filter(moduleItem => moduleItem.isApplication === true) : [];

                        }
                    },
                );
            }
        } else {
            this.moduleItems = JSON.parse(storedData);
            this.userModules = this.moduleItems ? this.moduleItems.filter(moduleItem => moduleItem.isApplication === true) : [];
        }
    }

    getMenusByModule(moduleId: any): MenuItem[] {
        const menuByModule = this.menuItems.filter((item: any) => item.menuModule.toString() === moduleId);
        const menuMap = {};
        menuByModule.forEach(menu => {
            menuMap[menu.menuId] = menu;
            menu.children = [];
        });
        this.rootMenus = [];
        menuByModule.forEach(menu => {
            if (menu.menuParent === "-1") {
                this.rootMenus.push(menu);
            } else {
                const parentMenu = menuMap[menu.menuParent];
                if (parentMenu) {
                    parentMenu.children.push(menu);
                } 
            }
        });
        const moduleItem = this.moduleItems.find((item: any) => item.moduleId === moduleId);
        console.log("module item", moduleItem);
        this.clickedModule(moduleItem)
        return this.rootMenus;
    }

    getMenuContent(menuId: string): any {
        this.activeMenu = !this.activeMenu;

        console.log("this.activeMenu", this.activeMenu);

        const menuItem = this.menuItems.find(item => item.menuId === menuId);
        console.log('menuItem', menuItem);

        if (menuItem) {
            const newPlatform = menuItem.newPlatform;
            const menuType = menuItem.menuType;
            if (menuType !== "M") {
                if (newPlatform) {
                    const menuRouter = menuItem.menuRouter;
                    this.router.navigate([menuRouter]);
                } else {
                    this.getIframeUrl(menuId)
                }
            }

        } else {
            return null;
        }
    }

    getIframeUrl(iframeId: string): any {
        const menuItem = this.menuItems.find(item => item.menuId === iframeId);
        if (menuItem) {
            this.iframeUrl = menuItem.menuRouter;
            this.menuService.setIframeUrl(this.iframeUrl);

            this.router.navigate(['iframes', iframeId]);
            return menuItem.menuRouter;
        } else {
            return null;
        }
    }

    toggleFavoriteMenu(menuItem: any) {

        menuItem.favorite = !menuItem.favorite;

        const menuItemId = menuItem.menuId;
        const index = this.favoritedItems.findIndex(item => item.menuId === menuItemId);

        if (index > -1) {
            this.favoritedItems.splice(index, 1);

        } else {
            this.favoritedItems.push(menuItem);
            this.showFavorites = true;
        }

        localStorage.setItem('favoritedItems', JSON.stringify(this.favoritedItems));

        const token = this.authService.getToken();
        if (token) {
            this.menuService.toggleFavoriteMenu(this.userId, menuItemId, token).subscribe(
                (response) => {
                    console.log("response toggleFavoriteMenu", response);
                },
            );
        }
    }

    toggleFavoriteModule(item) {
        this.showPinned = !this.showPinned
        const moduleId = item.module_id;
        const index = this.pinnedItems.findIndex(pinnedItem => pinnedItem.moduleId === moduleId);

        if (index > -1) {
            this.pinnedItems.splice(index, 1);
        } else {
            this.pinnedItems.push(item);
        }

        const token = this.authService.getToken();
        if (token) {
            this.menuService.toggleFavoriteModule(this.userId, moduleId, token).subscribe(
                (response) => {
                    console.log("response toggleFavoriteModule", response);
                },
                (error) => {
                    console.error("Error toggling favorite status:", error);
                }
            );
        }
    }

    getUserFavoriteMenu(): void {
        const token = this.authService.getToken();
        if (token) {
            this.menuService.getUserFavoriteMenu(token).subscribe(
                (response) => {
                    if (response && response.data && response.data.tt_user_fav_menu) {
                        const favoritedItems = response.data.tt_user_fav_menu;
                        const favoriteMenuIds: string[] = favoritedItems.map((item: any) => item.menu_id);
                        this.favoritedItems = this.menuItems.filter((menuItem: any) => favoriteMenuIds.includes(menuItem.menuId));
                        localStorage.setItem('favoritedItems', JSON.stringify(this.favoritedItems));
                    }
                },
            );
        }
    }



    getUserFavoriteModule(): void {
        const token = this.authService.getToken();
        if (token) {
            this.menuService.getUserFavoriteModule(token).subscribe(
                (response) => {
                    if (response && response.data && response.data.tt_user_fav_module) {
                        const favoritedItems = response.data.tt_user_fav_module;
                        const favoriteModuleIds: string[] = favoritedItems.map((item: any) => item.module_id);
                        this.pinnedItems = this.moduleItems.filter((moduleItem: any) => favoriteModuleIds.includes(moduleItem.moduleId));
                        localStorage.setItem('pinnedItems', JSON.stringify(this.pinnedItems));
                        this.showPinned = true;
                    }
                },

            );
        }
    }



    clickedModule(item: any) {
        this.showPinned = true;
        console.log("item clicked module",item);
        const moduleId = item.moduleId;

        const isAlreadyActive = this.pinnedItems.some(pinnedItem => pinnedItem.moduleId === moduleId && pinnedItem.active);
        console.log("item", item.moduleId);
        if (!isAlreadyActive && this.pinnedItems.length < 5) {
            this.pinnedItems.forEach(pinnedItem => {
                pinnedItem.active = pinnedItem.moduleId === moduleId;

            });
            console.log("item clicked", item);
            const isAlreadyPinned = this.pinnedItems.some(pinnedItem => pinnedItem.moduleId === moduleId);
            if (!isAlreadyPinned) {
                this.pinnedItems.push({
                    moduleId: moduleId,
                    moduleIcon: item.moduleIcon,
                    active: true
                });
                console.log("item", item);
            }
        }
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }

    toggleHome(feature: string): void {

        this.activeHome = !this.activeHome;
        this.layoutService.onMenuToggle();
        /*
                 if (feature === "home") {
                     this.activeHome = !this.activeHome;
                     this.feature = "home";
                     
                 } else if(feature === "module"){
                     this.feature = 'module';
                 } */
    }

    clickFavorite() {
        this.isActive = !this.isActive;
    }

    @HostListener('document:mouseover', ['$event'])
    onDocumentClick(event: Event) {
        const targetElement = event.target as HTMLElement;
        const isInsidehome = targetElement.closest('.appbar-menubar-button-icon');

        if(isInsidehome){
            this.selectedModule=null;
            this.sidebarVisibleB=false;
        }
    }

}







