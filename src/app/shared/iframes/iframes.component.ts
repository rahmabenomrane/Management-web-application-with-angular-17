import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuService } from '../../core/services/menu.service';
import { ProcessService } from '../../core/services/process.service';
import { AuthService } from '../../core/services/auth.service';
import { StatusBarService } from '../../core/services/status-bar.service';


@Component({
  selector: 'iframes',
  standalone: true,
  imports: [],
  templateUrl: './iframes.component.html',
  styleUrl: './iframes.component.css' ,
})
export class IframesComponent {

  iframeId : string;
  iframeUrl: SafeResourceUrl;
  menuItems: any [] = [];

  processId        : string; 
  processRevision  : string; 
  oProcessId       : string; 
  nbr              : string; 
  processName      : string; 

  leftItems = [];
  rightItems = [];


  constructor(private statusBarService: StatusBarService,private renderer: Renderer2, private elementRef: ElementRef,private authService: AuthService, private sanitizer: DomSanitizer, private router: Router, private menuService: MenuService, private processService: ProcessService) {
  

    this.processId       = this.processService.getProcessId();
    this.processRevision = this.processService.getProcessRevision();
    this.oProcessId      = this.processService.getOprocessId();
    this.nbr             = this.processService.getNbr();

    this.router.events.subscribe((event) => {

      var hasNavigation = false;

      if(!this.processId && !this.processRevision && !this.oProcessId && !this.nbr){

        if (event instanceof NavigationStart) {
          hasNavigation = true;                
        }
        if (event instanceof NavigationEnd) {
          hasNavigation = true;  
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/scripts/cgiip.exe/WService=ws-pgh-P230326/' + this.menuService.getIframeUrl() + '?SessionId=' + encodeURIComponent(this.authService.getToken()) + '&newplatform=1&menuId=&' +  Math.floor(Math.random() * 9999));       
        }
        if (event instanceof NavigationError) {
          hasNavigation = true;
        }
        if(!hasNavigation) {
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/scripts/cgiip.exe/WService=ws-pgh-P230326/' + this.menuService.getIframeUrl() + '?SessionId=' + encodeURIComponent(this.authService.getToken()) + '&newplatform=1&menuId=&' +  Math.floor(Math.random() * 9999));
        }

      } else {
        if(!this.processRevision && !this.oProcessId && !this.nbr){

          if (event instanceof NavigationStart) {
            hasNavigation = true;                
          }
          if (event instanceof NavigationEnd) {
            hasNavigation = true;  
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/scripts/cgiip.exe/WService=ws-pgh-P230326/msp/wf/ui/openForm.html?SessionId='+ encodeURIComponent(this.authService.getToken()) +'&process_id=' + this.processId +'&newplatform=1&mode=c&menuId='+Math.floor(Math.random() * 9999)) ;
          }
          if (event instanceof NavigationError) {
            hasNavigation = true;
          }
          if(!hasNavigation) {
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/scripts/cgiip.exe/WService=ws-pgh-P230326/msp/wf/ui/openForm.html?SessionId='+ encodeURIComponent(this.authService.getToken()) +'&process_id=' + this.processId +'&newplatform=1&mode=c&menuId='+Math.floor(Math.random() * 9999)) ;
          } 

        } else {

          if (event instanceof NavigationStart) {
            hasNavigation = true;                
          }
          if (event instanceof NavigationEnd) {
            hasNavigation = true;  
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/scripts/cgiip.exe/WService=ws-pgh-P230326/msp/wf/ui/openForm.html?SessionId='+ encodeURIComponent(this.authService.getToken()) +'&process_id=' + this.processId + '&oprocess_id='+ this.oProcessId +'&process_revision='+ this.processRevision + '&nbr='+ this.nbr + '&newplatform=1&menuId='+Math.floor(Math.random() * 9999)) ;
          }
          if (event instanceof NavigationError) {
            hasNavigation = true;
          }
          if(!hasNavigation) {
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/scripts/cgiip.exe/WService=ws-pgh-P230326/msp/wf/ui/openForm.html?SessionId='+ encodeURIComponent(this.authService.getToken()) +'&process_id=' + this.processId + '&oprocess_id='+ this.oProcessId +'&process_revision='+ this.processRevision + '&nbr='+ this.nbr + '&newplatform=1&menuId='+Math.floor(Math.random() * 9999)) ;
          } 

        }

        
      }
      
    }
    ); 
  }

  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    this.processName = this.processService.getProcessName();
 
    this.statusBarService.addStatusBarItem('fas fa-edit', this.processName, 'right', () => {
      console.log('New Item Clicked');
    });

  }
 
  receiveMessage(event) {
    if (event.data === 'buttonClicked') {
      console.log('Message received:', event.data);
      this.router.navigate(['/inbox']);    
    }
  }

  ngOnDestroy() {
    this.statusBarService.clearStatusBarItems();
  }

}

