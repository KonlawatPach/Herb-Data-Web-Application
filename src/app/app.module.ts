import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { HerbBoxComponent } from './searchpage/herb-box/herb-box.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginComponent } from './login/login.component';
import { ToptwelveherbsContainerComponent } from './index/toptwelveherbs-container/toptwelveherbs-container.component';
import { HerbDetailComponent } from './herb-detail/herb-detail.component';
import { FilterBoxComponent } from './searchpage/filter-box/filter-box.component';
import { ScrapingpageComponent } from './scrapingpage/scrapingpage.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SearchpageComponent,
    HerbBoxComponent,
    NavbarComponent,
    AdminpageComponent,
    LoginComponent,
    ToptwelveherbsContainerComponent,
    HerbDetailComponent,
    FilterBoxComponent,
    ScrapingpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
