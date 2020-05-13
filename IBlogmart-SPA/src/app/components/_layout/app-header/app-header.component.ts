import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  private toggleButton: any;
  private sidebarVisible: boolean;
  categories: Category[];
  links: Array<{ title: string, path: string }> = [];

  constructor(public location: Location,
              private element: ElementRef,
              private categoryService: CategoryService) {
      this.sidebarVisible = false;
  }

  ngOnInit() {

    this.categoryService.getall().subscribe(res => {

        res.map((category) => {
            if (category.active) {
               this.links.push({title: category.name, path: '/' + category.name});
            }
        });
      });

    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

  }
  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const html = document.getElementsByTagName('html')[0];
      // console.log(html);
      // console.log(toggleButton, 'toggle');

      setTimeout(function() {
          toggleButton.classList.add('toggled');
      }, 500);
      html.classList.add('nav-open');

      this.sidebarVisible = true;
  }
  sidebarClose() {
      const html = document.getElementsByTagName('html')[0];
      // console.log(html);
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      html.classList.remove('nav-open');
  }
  sidebarToggle() {
      // const toggleButton = this.toggleButton;
      // const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
  }
  isHome() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
        titlee = titlee.slice( 1 );
    }
    if ( titlee === '/home' ) {
          return true;
      } else {
          return false;
      }
  }
  isDocumentation() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
        titlee = titlee.slice( 1 );
    }
    if ( titlee === '/documentation' ) {
          return true;
      } else {
          return false;
      }
  }

}
