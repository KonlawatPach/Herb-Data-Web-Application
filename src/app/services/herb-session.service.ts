import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { herb_data } from '../herblist';

@Injectable({
  providedIn: 'root'
})
export class HerbSessionService {
  constructor(
    private crud: CrudService
  ) {}

  async getHerbs(){
    let herbs = sessionStorage.getItem('herbs');
    if(herbs == null){
      let document = (await this.crud.getHerb()); 
      sessionStorage.setItem('herbs', JSON.stringify(document));
      return document;
    }else{
      return JSON.parse(herbs);
    }
  }

  async getHerbProperty(){
    let herbProperty = sessionStorage.getItem('herbPropertyList');
    if(herbProperty == null || herbProperty == ""){
      sessionStorage.setItem('herbPropertyList', '');
      let propertyArray = (await this.crud.getHerbProperty()); 
      sessionStorage.setItem('herbPropertyList', JSON.stringify(propertyArray));
      return propertyArray;
    }else{
      return JSON.parse(herbProperty);
    }
  }
}
