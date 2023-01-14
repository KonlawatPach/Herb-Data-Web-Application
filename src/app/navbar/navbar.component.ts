import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
    this.nowpath = this.location.path();
  }

  linkto(path:string){
    this.nowpath = '/' + path;
    this.router.navigate(['/' + path]);
  }

}
