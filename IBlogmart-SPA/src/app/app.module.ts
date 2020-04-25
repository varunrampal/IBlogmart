import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturedPostComponent } from './components/featured-post/featured-post.component';
import { RecentPostComponent } from './components/recent-post/recent-post.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent,
      FeaturedPostComponent,
      RecentPostComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
