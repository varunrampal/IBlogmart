import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppLayoutComponent } from './components/_layout/app-layout/app-layout.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { CategoriesResolver } from './_resolvers/categories.resolver';

const routes: Routes = [


  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: { categories: CategoriesResolver },
      },
      //{ path: 'login', component: AdminLoginComponent },
      // {
      //   path: 'categories',
      //   loadChildren: () =>
      //     import('./categories/categories.module').then(
      //       (m) => m.CategoriesModule
      //     ),
      // },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
