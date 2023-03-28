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
  nowFilterList : any = [];
  
  isSearching : boolean = false;
  showMagnifyingGlass : boolean = true;
  isOpenFilter : boolean = false;
  useFilter: boolean = false;
  

  constructor(private herbs_session: HerbSessionService) {
  }

  async ngOnInit(){
    this.herbs_session.getHerbProperty();
    this.herbs = await this.herbs_session.getHerbs();
    this.displayHerbs = [...this.herbs];
    this.herbs_search_number = this.displayHerbs.length
  }  

  checkHerbName(word:string){
    this.wordSearching = word;
    let newHerbArray = [];
    for(let h of this.herbs){
      if((word == '' || h.nameTH.includes(word) || h._id.toLowerCase().includes(word.toLowerCase())) && this.passFilter(h)){
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
    }
    else{
      this.isSearching = false
      this.wordSearching = "";
    }
    this.compareWord(word);
    this.searchwordBox.nativeElement.value = word;
    this.checkHerbName(word);
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
  usefilter(filterList:any){
    this.isOpenFilter = false;
    if( //ไม่ระบุหมดเลย
      this.checkWordInArray(filterList[0], 'ไม่ระบุ') && 
      filterList[1][0] == 'ไม่ระบุ' &&
      filterList[1][1] == 'ไม่ระบุ' &&
      filterList[1][2] == 'ไม่ระบุ' &&
      filterList[1][3] == 'ไม่ระบุ'
    ){
      this.useFilter = false;
    }
    else{
      this.useFilter = true;
      this.nowFilterList = filterList;
    }
    this.search(this.wordSearching);
  }
  checkWordInArray(bioArray:any, word:string){
    for(let b of bioArray){
      if(b != word){
        return false;
      }
    }
    return true;
  }


  passFilter(herbObject:any){
    if(!this.useFilter){
      return true;
    }

    for(let i=0; i<8; i++){
      if(this.nowFilterList[0][i] != 'ไม่ระบุ'){
        let hb = herbObject.biology.find((x:any) => x.levelNo == i+1)
        if(hb != undefined && hb.value != this.nowFilterList[0][i]){
          return false;
        }
      }
    }

    if(this.nowFilterList[1][0] != 'ไม่ระบุ' && !herbObject.propertie.includes(this.nowFilterList[1][0])) return false;
    if(this.nowFilterList[1][1] != 'ไม่ระบุ' && !herbObject.forbidden_person.includes(this.nowFilterList[1][1])) return false;
    if(this.nowFilterList[1][2] != 'ไม่ระบุ' && !herbObject.substance.includes(this.nowFilterList[1][2])) return false;
    if(this.nowFilterList[1][3] != 'ไม่ระบุ' && !herbObject.side_effect.includes(this.nowFilterList[1][3])) return false;

    return true;
  }

  clearResult(){
    console.log("clear");
  }
}
