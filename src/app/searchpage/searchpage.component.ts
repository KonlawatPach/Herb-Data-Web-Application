import { Component, OnInit } from '@angular/core';
import { herb_data } from '../herblist';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  herbs : any  = herb_data;
  herbs_search_number : number = this.herbs.length;

  displayHerbs : any = [...this.herbs];
  wordSearching : string = "";
  isSearching : boolean = false;
  

  constructor(private service: CrudService) {
    this.getData()
  }

  ngOnInit(): void {
  }

  async getData(){
    this.herbs = (await this.service.getHerb()).documents;
    this.displayHerbs = [...this.herbs];
  }

  checkHerbName(word:string){
    this.wordSearching = word;
    let newHerbArray = [];
    for(let h of this.herbs){
      if(h.nameTH.includes(word) || h._id.toLowerCase().includes(word.toLowerCase())){
        newHerbArray.push(h);
      }
    }
    this.displayHerbs = [...newHerbArray];
    this.herbs_search_number = this.displayHerbs.length;
  }

  search(word:string){
    if(word.replace(" ", "") != ""){
      word = word.replace(" ", "")
      this.isSearching = true
      this.checkHerbName(word)
    }
    else{
      this.isSearching = false
      this.displayHerbs = [...this.herbs]
    }
  }

  openfilter(){

  }

}
