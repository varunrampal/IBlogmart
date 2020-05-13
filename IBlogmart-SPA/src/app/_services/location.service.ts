import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
pagetitle: string;

  constructor() { }

  getActiveMenuItem(path: string) {
    const type = path.split('/');
    let menuItem: any;

    switch (type[2]) {
        case 'category': {
          menuItem = 'category';
          break;
        }
        case 'dashboard': {
          menuItem = 'dashboard';
          break;
        }
        default: {
            menuItem = 'dashboard';
            break;
        }
     }
    return menuItem;
  }
}
