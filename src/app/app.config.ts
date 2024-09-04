import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import {  HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { httpInterceptor } from './core/interceptors/auth-interceptor.service';
import { NumberSuffixPipe } from './number-suffix.pipe';
import { MessageService } from './shared/components/api/messageservice';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppModule } from './app.module';
import { AppTranslateModule } from './modules/app-translate.module';


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), 
    withEnabledBlockingInitialNavigation()), provideHttpClient(withFetch()), provideAnimationsAsync(), provideAnimationsAsync(),
    provideAnimations(),provideHttpClient(withInterceptors([httpInterceptor])), NumberSuffixPipe,MessageService, 
     provideAnimationsAsync(),
   importProvidersFrom(HttpClientModule),
   importProvidersFrom(AppTranslateModule.forRoot())
],  

   
};
