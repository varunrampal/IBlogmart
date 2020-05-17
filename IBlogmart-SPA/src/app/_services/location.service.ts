import { Injectable, EventEmitter } from '@angular/core';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
pagetitle: string;
categoriesEmitted = new EventEmitter<Category[]>();

  constructor() { }

  getActiveMenuItem(path: string) {
    const type = path.split('/');
    let menuItem: any;

    switch (type[2]) {
        case 'category': {
          menuItem = 'category';
          break;
        }
        case 'subcategory': {
          menuItem = 'subcategory';
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
