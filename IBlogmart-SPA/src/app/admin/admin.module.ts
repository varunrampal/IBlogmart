import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { TabsModule } from '../../../node_modules/ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminLayoutComponent } from '../components/_layout/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from '../components/_layout/admin-header/admin-header.component';
import { AdminCategoryListComponent } from './components/admin-category-list/admin-category-list.component';
import { CategoriesResolver } from '../_resolvers/categories.resolver';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminCategoryDetailsComponent } from './components/admin-category-details/admin-category-details.component';
import { AdminCategoryEditComponent } from './components/admin-category-edit/admin-category-edit.component';
import { AdminImageEditorComponent } from './shared/admin-image-editor/admin-image-editor.component';
import { AdminSubcategoryListComponent } from './components/admin-subcategory-list/admin-subcategory-list.component';
import { AdminSubcategoryCreateComponent } from './components/admin-subcategory-create/admin-subcategory-create.component';
import { SubCategoryService } from '../_services/subcategory.service';
import { IsalreadyexistsDirective } from '../_directives/isalreadyexists.directive';
import { CategoryResolver } from '../_resolvers/category.resolver';
import { AdminCategoryCreateComponent } from './components/admin-category-create/admin-category-create.component';
import { AdminSubcategoryEditComponent } from './components/admin-subcategory-edit/admin-subcategory-edit.component';
import { AdminSubcategoryDetailsComponent } from './components/admin-subcategory-details/admin-subcategory-details.component';

@NgModule({
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgxGalleryModule,
            NgbModule,
            TabsModule.forRoot(),
            FileUploadModule,
            AdminRoutes
           ],
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    AdminCategoryListComponent,
    AdminCategoryDetailsComponent,
    AdminCategoryEditComponent,
    AdminImageEditorComponent,
    AdminSubcategoryListComponent,
    AdminSubcategoryCreateComponent,
    IsalreadyexistsDirective,
    AdminCategoryCreateComponent,
    AdminSubcategoryEditComponent,
    AdminSubcategoryDetailsComponent
  ],
 
  providers: [CategoriesResolver,
              CategoryResolver,
              SubCategoryService]
})
export class AdminRoutingModule {}
