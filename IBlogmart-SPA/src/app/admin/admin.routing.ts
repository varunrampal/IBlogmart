import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../components/_layout/admin-layout/admin-layout.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminCategoryListComponent } from './components/admin-category-list/admin-category-list.component';
import { CategoryResolver } from '../_resolvers/categories.resolver';
import { AdminCategoryDetailsComponent } from './components/admin-category-details/admin-category-details.component';
import { AdminCategoryEditComponent } from './components/admin-category-edit/admin-category-edit.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      // { path: 'login', component: AdminLoginComponent},
      { path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      { path: 'category/list',
        component: AdminCategoryListComponent,
        canActivate: [AuthGuard],
        resolve: { categories: CategoryResolver },
      },
      { path: 'category/details/:id',
        component: AdminCategoryDetailsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'category/edit/:id',
      component: AdminCategoryEditComponent,
      canActivate: [AuthGuard],
    }

      ]
  }
];

export const AdminRoutes = RouterModule.forChild(routes);
