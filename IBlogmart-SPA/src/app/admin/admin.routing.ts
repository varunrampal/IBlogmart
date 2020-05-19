import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../components/_layout/admin-layout/admin-layout.component';

import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminCategoryListComponent } from './components/admin-category-list/admin-category-list.component';
import { CategoriesResolver } from '../_resolvers/categories.resolver';
import { AdminCategoryDetailsComponent } from './components/admin-category-details/admin-category-details.component';
import { AdminCategoryEditComponent } from './components/admin-category-edit/admin-category-edit.component';
import { AdminSubcategoryCreateComponent } from './components/admin-subcategory-create/admin-subcategory-create.component';
import { AdminSubcategoryListComponent } from './components/admin-subcategory-list/admin-subcategory-list.component';
import { CategoryResolver } from '../_resolvers/category.resolver';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      // { path: 'login', component: AdminLoginComponent},
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'category/list',
        component: AdminCategoryListComponent,
        canActivate: [AuthGuard],
        resolve: { categories: CategoriesResolver },
      },
      {
        path: 'category/create',
        component: AdminSubcategoryCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'category/details/:id',
        component: AdminCategoryDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'category/edit/:id',
        component: AdminCategoryEditComponent,
        canActivate: [AuthGuard],
        resolve: { category: CategoryResolver },
        data: { path: 'category/edit/:id' }
      },
      {
        path: 'subcategory/list',
        component: AdminSubcategoryListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'subcategory/create',
        component: AdminSubcategoryCreateComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

export const AdminRoutes = RouterModule.forChild(routes);
