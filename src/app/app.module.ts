import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HerbBoxComponent } from './searchpage/herb-box/herb-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchpageComponent,
    NavbarComponent,
    HerbBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
