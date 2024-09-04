import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomHandler } from 'primeng/dom';


@Component({
    selector: 'app-main',
    template: `
        <div class="layout-wrapper" [ngClass]="containerClass" [attr.data-p-theme]="theme">
            <div class="layout-mask" [ngClass]="{ 'layout-mask-active': isMenuActive }" (click)="hideMenu()"></div>
            <div class="layout-content">
                <div class="layout-content-slot">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    standalone: true,
    imports: [RouterOutlet, CommonModule]
})
export class AppMainComponent {
    constructor(@Inject(DOCUMENT) private document: Document) {}

}
