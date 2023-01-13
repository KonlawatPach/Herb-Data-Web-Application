import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HerbBoxComponent } from './searchpage/herb-box/herb-box.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchpageComponent,
    NavbarComponent,
    HerbBoxComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    // CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
