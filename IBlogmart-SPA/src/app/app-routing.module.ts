import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppLayoutComponent } from './components/_layout/app-layout/app-layout.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';


const routes: Routes = [

    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent },
    // { path: 'dashboard', component: DashboardComponent },

    {
      path: '',
      component: AppLayoutComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent},
        { path: 'login', component: AdminLoginComponent}

        ]
    }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
