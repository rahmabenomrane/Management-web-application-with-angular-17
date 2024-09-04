import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface StatusBarItem {
  iconClass: string;
  text: string;
  position: 'left' | 'right';
  click: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  private items: StatusBarItem[] = [];
  private itemsSubject = new BehaviorSubject<StatusBarItem[]>([]);

  items$ = this.itemsSubject.asObservable();

  addStatusBarItem(iconClass: string, text: string, position: 'left' | 'right', click: () => void) {
    const currentItems = this.itemsSubject.getValue();
    this.itemsSubject.next([...currentItems, { iconClass, text, position, click }]);
  }

  getStatusBarItems(): StatusBarItem[] {
    return this.items;
  }
  
  clearStatusBarItems() {
    this.itemsSubject.next([]);
  }
  
}
