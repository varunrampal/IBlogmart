import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { CategoryResolver } from '../_resolvers/categories.resolver';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminCategoryDetailsComponent } from './components/admin-category-details/admin-category-details.component';
import { AdminCategoryEditComponent } from './components/admin-category-edit/admin-category-edit.component';
import { AdminImageEditorComponent } from './shared/admin-image-editor/admin-image-editor.component';


@NgModule({
  imports: [CommonModule,
            FormsModule,
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
    AdminImageEditorComponent
  ],
  providers: [CategoryResolver]
})
export class AdminRoutingModule {}
