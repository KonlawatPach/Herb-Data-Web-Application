import { Component } from '@angular/core';
import { CrudService } from './services/crud.service';
import { HerbSessionService } from './services/herb-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showappNavbar = true;
  loadFinish = false;

  constructor(private service: HerbSessionService){
    this.loadData();
  }

  async loadData(){
    await this.service.getHerbs()
    this.loadFinish = true;
  }

  ngOnInit(): void {
  } 
}
