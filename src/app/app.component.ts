import { Component } from '@angular/core';
import { CrudService } from './crud.service';
import { herb_data } from './herblist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showappNavbar = true;
  loadFinish = false;

  constructor(private service: CrudService){
    if(sessionStorage.getItem('herbs') == null){
      // this.getData();
      sessionStorage.setItem('herbs', JSON.stringify(herb_data));
    }
    this.loadFinish = true;
  }
  ngOnInit(): void {
  }

  async getData(){
    let document = (await this.service.getHerb()).documents; 
  }

  
}
