import { Component,HostListener,inject,OnInit,} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { MainComponent } from './core/main/main.component';
import { PrimeNGConfig } from './shared/components/api/primengconfig';
import { CommonModule } from '@angular/common';
import { TranslateStore, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { TranslationService } from './shared/services/translation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet,CommonModule ,FormsModule, ReactiveFormsModule,  MainComponent ],
    providers: [TranslateStore]
})
export class AppComponent implements OnInit {
    
   
    TranslationService = inject(TranslationService);
    
     ngOnInit(): void {
         this.TranslationService.setDefaultLang('fr');
     }
  
}
