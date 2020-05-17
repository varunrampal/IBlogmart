import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { LocationService } from 'src/app/_services/location.service';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: '/admin/category/list',         title: 'Category',             icon: 'nc-tile-56',    class: '' },
    { path: '/admin/subcategory/list',         title: 'Sub',             icon: 'nc-tile-56',    class: '' },
    // { path: '/notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon: 'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon: 'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon: 'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon: 'nc-spaceship',  class: 'active-pro' },
];

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    public menuItems: any[];
    menuItem: string;
    location: Location;
    constructor(private locationService: LocationService,
                location: Location) { this.location = location; }

    ngOnInit() {

       this.menuItem = this.locationService.getActiveMenuItem(this.location.path());

         // this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    menuItemClicked(type: string) {
        this.menuItem = type;


    }
}
