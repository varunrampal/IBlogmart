import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  test : Date = new Date();
    focus;
    focus1;
    model: any = {};
  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router
              ) { }

  ngOnInit() {
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
