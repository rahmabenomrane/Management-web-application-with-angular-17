import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpLoaderFactory } from './modules/app-translate.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppTranslateModule } from './modules/app-translate.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator'; 
import { MenuService } from './menu.service';
import { RoleService } from './role.service';
@NgModule({
  declarations: [
    //AppComponent,
   // AppBarComponent,
  ],
  imports: [
    HttpClientModule, 
    BrowserAnimationsModule,
    PaginatorModule,
    ReactiveFormsModule,
    AppTranslateModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
     ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [MenuService,RoleService],
  bootstrap: [AppComponent],
  
 
})
export class AppModule { }
