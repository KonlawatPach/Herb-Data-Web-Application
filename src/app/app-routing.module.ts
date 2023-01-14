import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "search", component: SearchpageComponent},
  {path: "admin", component: AdminpageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
