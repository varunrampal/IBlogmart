import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../components/_layout/admin-layout/admin-layout.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: AdminLoginComponent},
      { path: 'dashboard', component: DashboardComponent},
      ]
  }
];

export const AdminRoutes = RouterModule.forChild(routes);
