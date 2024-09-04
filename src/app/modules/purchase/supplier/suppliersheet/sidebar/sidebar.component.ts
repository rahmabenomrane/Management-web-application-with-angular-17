import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

/* export interface ChipColor {
  name: string;
  color: ThemePalette;
}
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

  /* stateOptions: any[] = [{label: 'Non', value: 'off'}, {label: 'Oui', value: 'on'}];
  color: ThemePalette = 'primary';
  isVertical = true;


  constructor() {}

  availableColors: ChipColor[] = [
    {name: 'Concurrent', color: 'primary'},
  ];

  ngOnInit() {
    
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn');
    const searchBtn = document.querySelector('.bx-search');

    closeBtn?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    searchBtn?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    function menuBtnChange() {
      if (sidebar?.classList.contains('open')) {
        closeBtn?.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn?.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    } 
  } */

}
