import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminLayoutComponent } from '../components/_layout/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from '../components/_layout/admin-header/admin-header.component';

@NgModule({
  imports: [CommonModule,
            FormsModule,
            AdminRoutes
           ],
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    DashboardComponent,
  ],
})
export class AdminRoutingModule {}
