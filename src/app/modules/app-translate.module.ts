import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateCompiler as NgxTranslateCompiler, TranslateLoader as NgxTranslateLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

// Fonction pour créer le chargeur de traduction
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  
}

// Fonction pour créer le compilateur de traduction
export function translateCompilerFactory() {
  return new TranslateMessageFormatCompiler();
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: NgxTranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: NgxTranslateCompiler,
        useFactory: translateCompilerFactory
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [TranslateModule]
})
export class AppTranslateModule {
  static forRoot(): ModuleWithProviders<AppTranslateModule> {
    return {
      ngModule: AppTranslateModule,
      providers: []
    };
  }

  static forChild(): ModuleWithProviders<AppTranslateModule> {
    return {
      ngModule: AppTranslateModule,
      providers: []
    };
  }
}
