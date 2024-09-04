import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StatusBarService } from 'src/app/core/services/status-bar.service';
import { MenuModule } from 'primeng/menu';
import { Component, Injectable, ViewChild } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { TranslateService, TranslateModule} from '@ngx-translate/core';

@Component({
	selector: 'status-bar',
	templateUrl: './statusbar.component.html',
	styleUrls: ['./statusbar.component.css'],
	standalone: true,
	imports : [FormsModule,
	    CommonModule,
		MenuModule,
		 
		],
		  providers: [],
})
export class StatusBarComponent {

	lang:string = '';
	leftItems = [];
  	rightItems = [];
	menuItems: MenuItem[] | undefined;
	@ViewChild('languageMenu') languageMenu: any; // Référence au menu PrimeNG

	private subscription: Subscription;

  	constructor(private statusBarService: StatusBarService ,private translateService: TranslateService) {

			// Set the default language
			this.translateService.setDefaultLang('fr');
			console.log("lang", this.lang);
		 
			// Use a language
			//this.translateService.use('fr-FR'); 
	}

	ngOnInit(): void {
		console.log("status entered");
		
		this.statusBarService.items$.subscribe(items => {
			this.leftItems = items.filter(item => item.position === 'left');
			this.rightItems = items.filter(item => item.position === 'right');
		});
		
		this.menuItems = [
			{ label: 'Français', icon: 'pi pi-flag flag-icon-fr', command: () => this.changeLanguage('fr') },
			{ label: 'Anglais', icon: 'pi pi-flag flag-icon-gb', command: () => this.changeLanguage('en-US') }
		  ];
		  this.lang = localStorage.getItem('lang') || 'fr';
	}
	toggleMenu(event: MouseEvent) {
		// Afficher le menu lorsque le div est cliqué
		this.languageMenu.toggle(event);
	  }



	
	  changeLanguage(lang: string) {
		// Implémente la logique pour changer la langue de l'application
		console.log('Changer la langue vers :', lang);
		// Exemple : implémenter un service pour mettre à jour la langue de l'application
	    this.translateService.use(lang);
		console.log("lang",lang);
		  
		//enregistrer la lang dans le local storage
		localStorage.setItem('lang', lang);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.statusBarService.clearStatusBarItems();
	}

}
