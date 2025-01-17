import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    menuMode: string; 
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    configSidebarVisible: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {


    

    
    _config: AppConfig = {
        inputStyle: 'outlined',
        menuMode: 'static', 
        colorScheme: 'light',
        theme: 'lara-light-blue',
        scale: 14,
    };

    config = signal<AppConfig>(this._config);

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        configSidebarVisible: false,
    };

    private configUpdate = new Subject<AppConfig>();
    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        effect(() => {
            const config = this.config();            
            if (this.updateStyle(config)) {
                this.changeTheme();
            }
            this.changeScale(config.scale);
            this.onConfigUpdate();
        });
    }

    updateStyle(config: AppConfig) {                
        return (
            config.theme !== this._config.theme ||
            config.colorScheme !== this._config.colorScheme
        );                
    }

    onMenuToggle() {   
        this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;  
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    onConfigUpdate() {
        this._config = { ...this.config() };
        this.configUpdate.next(this.config());
    }

    changeTheme() {  
  
        const config = this.config();
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const themeLinkHref = themeLink.getAttribute('href')!;
        const newHref = themeLinkHref
            .split('/')
            .map((el) =>
                el == this._config.theme
                    ? (el = config.theme)
                    : el == `theme-${this._config.colorScheme}`
                    ? (el = `theme-${config.colorScheme}`)
                    : el
            )
            .join('/');    
        this.replaceThemeLink(newHref);
    }
    
    setTheme(theme: string, colorScheme: string) {
        this._config.theme = theme;
        this._config.colorScheme = colorScheme;
        this.changeTheme();
    }
    
    
    replaceThemeLink(href: string) {
        const id = 'theme-css';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }

    changeScale(value: number) {
        document.documentElement.style.fontSize = `${value}px`;
    }
}
