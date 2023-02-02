import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginComponent } from './login/login.component';
import { HerbDetailComponent } from './herb-detail/herb-detail.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: "", 
    component: IndexComponent,
  },
  {
    path: "search", 
    component: SearchpageComponent},
  {
    path: "admin", 
    component: AdminpageComponent, 
    canActivate: [AuthGuard]},
  {
    path: "login", 
    component: LoginComponent},
  {
    path: "search/:herbname", 
    component: HerbDetailComponent
  },
  {
    path: "**", 
    component: IndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
