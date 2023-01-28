import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HerbSessionService } from './services/herb-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showappNavbar = true;
  loadFinish = false;

  constructor(
    private service: HerbSessionService,
    public location: Location,
    public router: Router
  ){
    this.loadData();
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.checkcloseNav(location.path());
        this.showappNavbar = false;
        this.showappNavbar = true;

        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
    });
  }

  async loadData(){
    await this.service.getHerbs()
    this.loadFinish = true;
  }

  ngOnInit(): void {
  }

  checkcloseNav(path: string){
    if(path == "/login"){
      this.showappNavbar = false;
    }
    else{
      this.showappNavbar = true;
    }
  }
}
