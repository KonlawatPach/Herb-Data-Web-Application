import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HerbSessionService } from '../services/herb-session.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  @ViewChild('searchword') searchwordBox: any;
  herbs : any  = [];
  herbs_search_number : number = 0;

  displayHerbs : any = [];
  wordSearching : string = "";
  
  isSearching : boolean = false;
  showMagnifyingGlass : boolean = true;
  isOpenFilter : boolean = true;
  

  constructor(private herbs_session: HerbSessionService) {
  }

  async ngOnInit(){
    this.herbs = await this.herbs_session.getHerbs();
    this.displayHerbs = [...this.herbs];
    this.herbs_search_number = this.displayHerbs.length

    if(sessionStorage.getItem("searchwordfromhomepage") != null){
      this.search(sessionStorage.getItem("searchwordfromhomepage")!);
      sessionStorage.removeItem("searchwordfromhomepage");
    }
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
    word = word.replaceAll(" ", "")
    if(word != "" && this.wordSearching != word){
      this.isSearching = true
      this.checkHerbName(word)
      this.compareWord(word);
      this.searchwordBox.nativeElement.value = word;
    }
    else{
      this.isSearching = false
      this.wordSearching = "";
      this.displayHerbs = [...this.herbs]
      this.searchwordBox.nativeElement.value = '';
      this.compareWord('');
    }
  }

  compareWord(word:string){
    word = word.replace(" ", "");
    if((this.isSearching && word == this.wordSearching) || (word == "" && this.wordSearching != "" && this.isSearching)){
      this.showMagnifyingGlass = false;
    }else{
      this.showMagnifyingGlass = true;
    }
  }

  openfilter(){
    this.isOpenFilter = true;
  }

}
