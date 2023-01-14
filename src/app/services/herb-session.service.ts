import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { herb_data } from '../herblist';

@Injectable({
  providedIn: 'root'
})
export class HerbSessionService {
  constructor(private crud: CrudService) { }

  async getHerbs(){
    let herbs = sessionStorage.getItem('herbs');
    if(herbs == null){
      let document = (await this.crud.getHerb()).documents; 
      // sessionStorage.setItem('herbs', JSON.stringify(herb_data));
      sessionStorage.setItem('herbs', JSON.stringify(document));

      return document;
    }else{
      return JSON.parse(herbs);
    }
  }


}
