import { Component } from '@angular/core';
import { CrudService } from './crud.service';
import { herb_data } from './herblist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  herbs = herb_data;

  constructor(private service: CrudService){
    this.getData();
  }
  ngOnInit(): void {
  }

  async getData(){
    this.herbs = (await this.service.getHerb()).documents; 
  }

  
}
