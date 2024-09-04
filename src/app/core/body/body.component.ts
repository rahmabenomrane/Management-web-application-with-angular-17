import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from '../menubar/menubar.component';
import { AppBarComponent } from '../appbar/appbar.component';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../services/layout.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IframesComponent } from 'src/app/shared/iframes/iframes.component';
import { DropdownModule } from 'primeng/dropdown';
import { UserMaintComponent } from '../user-maint/user-maint.component';
import { StartProcessComponent } from '../start-process/start-process.component';
import { InboxComponent } from '../inbox/inbox.component';
import { ProcessComponent } from '../process/process.component';
import { TabComponent } from '../tab/tab.component';
import { AppdownloadedComponent } from 'src/app/appdownloaded/appdownloaded.component';
import { MaintenanceComponent } from 'src/app/maintenance/maintenance.component';
import { GestutiComponent } from 'src/app/gestuti/gestuti.component';
interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
	selector: 'app-body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.css'],
	standalone: true,
	imports: [
		ProcessComponent,
		InboxComponent,
		StartProcessComponent,
		UserMaintComponent,
        IframesComponent,
		AppBarComponent, 
		MenubarComponent, 
		CommonModule, 
		FormsModule, 
		AutoCompleteModule, 
		CalendarModule, 
		CascadeSelectModule,
		CheckboxModule,
		ButtonModule,
        RouterOutlet,
        DropdownModule,
		TabComponent,
		AppdownloadedComponent,
		MaintenanceComponent,
		GestutiComponent
	]
})

export class BodyComponent implements OnInit {
	items         : any[] | undefined;
	selectedItem  : any;
	suggestions   : any[] | undefined;
	date          : Date | undefined;
	countries     : any[] | undefined;
    selectedCity  : any;
	checked       : boolean = false;

    

    constructor(public layoutService: LayoutService,private userService: UserService, private authService:AuthService) {}

	ngOnInit() {
    }
    
    get containerClass() {
      return {
          'layout-theme-light': this.layoutService.config().colorScheme === 'light',
          'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
          'layout-overlay': this.layoutService.config().menuMode === 'overlay',
          'layout-static': this.layoutService.config().menuMode === 'static',
          'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
          'p-input-filled': this.layoutService.config().inputStyle === 'filled',
         
      }
    }

	search(event: AutoCompleteCompleteEvent) {
		this.suggestions = [...Array(10).keys()].map((item) => event.query + '-' + item);
	}

   
}
