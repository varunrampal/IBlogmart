import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';
import { TabsModule } from 'node_modules/ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
// import { SidebarComponent } from './admin/shared/sidebar/sidebar.component';
import { FeaturedPostComponent } from './components/featured-post/featured-post.component';
import { RecentPostComponent } from './components/recent-post/recent-post.component';
import { AppLayoutComponent } from './components/_layout/app-layout/app-layout.component';
import { AppHeaderComponent } from './components/_layout/app-header/app-header.component';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptor } from './_services/error.interceptor';
import { ImageService } from './_services/image.service';
import { LocationService } from './_services/location.service';
import { CategoriesResolver } from './_resolvers/categories.resolver';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    // SidebarComponent,
    HeaderComponent,
    HomeComponent,
    FeaturedPostComponent,
    RecentPostComponent,


  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
  ],
  providers: [ErrorInterceptor,
    CategoriesResolver,
    AuthService,
    AlertifyService,
    ImageService,
    LocationService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }],
  bootstrap: [AppComponent],
})
export class AppModule { }
