import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nowpath = "";

  constructor(
    public location: Location,
    public router: Router
  ) { 
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.nowpath = this.location.path();
      }
    });
  }

  ngOnInit(): void {
    this.nowpath = this.location.path();
  }
}
