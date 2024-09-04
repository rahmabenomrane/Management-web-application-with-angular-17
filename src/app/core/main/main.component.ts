import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BodyComponent } from '../body/body.component';
import { StatusBarComponent } from '../statusbar/statusbar.component';
import { ConfigComponent } from '../config/config.component';
import { AppBarComponent } from '../appbar/appbar.component';
import { LayoutService } from 'src/app/core/services/layout.service';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [
    AppBarComponent,    
    HeaderComponent,
    CommonModule, 
    BodyComponent, 
    StatusBarComponent,
    NgOptimizedImage, 
    ConfigComponent,
    TabComponent
    
  ]
})
export class MainComponent {

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {}

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

}
