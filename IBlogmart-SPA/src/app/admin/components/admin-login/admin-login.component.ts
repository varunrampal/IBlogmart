import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, AfterViewInit {
  test: Date = new Date();
    focus;
    focus1;
    model: any = {};
    @ViewChild('usernameRef', {static: false} ) userNameElemRef: ElementRef;

  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router
              ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
     this.userNameElemRef.nativeElement.focus();

  }

  login() {
    this.authService.login(this.model)
    .subscribe(next => {
       this.alertifyService.success('Logged in successfully');
       this.router.navigate(['/admin/dashboard']);
       this.authService.userLoggedIn.emit(true);
    }, error => {
       this.alertifyService.error('Failed to login');
       console.log('Failed to login');
    });
 }

}
