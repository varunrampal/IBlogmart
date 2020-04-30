import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _opened: boolean = false;
  constructor( private element: ElementRef) { }

  ngOnInit() {
  }

  private _toggleOpened(): void {
    this._opened = !this._opened;
  }
  private _toggleSidebar() {
    this._opened = !this._opened;}

}
