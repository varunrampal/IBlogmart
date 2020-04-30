import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IBlogmart';
  cssUrl: string;

  constructor(public sanitizer: DomSanitizer) {
 
  }

  ngOnInit() {
    this.cssUrl = '/ppt/styles.css';
  }
}
