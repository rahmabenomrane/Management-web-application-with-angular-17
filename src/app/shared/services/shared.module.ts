import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


const modules = [
  TranslateModule,
  FormsModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
    exports: [
       ...modules
    ]
  
})
export class SharedModule { }
