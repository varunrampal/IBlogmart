import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

    ngOnInit() {
  
    }
}
