import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nowpath = "";
  public profile = '';

  constructor(
    public location: Location,
    public router: Router,
    private auth: AuthenticationService
  ) { 
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.nowpath = this.location.path();
        this.checkAuth();
      }
    });
  }

  ngOnInit(): void {
    this.nowpath = this.location.path();
  }

  checkAuth(){
    if(this.auth.isloggedIn){
      this.profile = atob(this.auth.getCurrentUser);
      if(this.profile.endsWith('admin')) this.profile = this.profile.slice(0, this.profile.length-5);
      else if(this.profile.endsWith('professional')) this.profile = this.profile.slice(0, this.profile.length-12)
    }
    else{
      this.profile = '';
    }
  }

  logout(){
    alert('ลงชื่อออกจากระบบสำเร็จ');
    this.auth.logout();
  }
}
