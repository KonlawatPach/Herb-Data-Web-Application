import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HerbSessionService } from '../services/herb-session.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  herbs : any  = [];
  herbs_search_number : number = 0;

  displayHerbs : any = [];
  wordSearching : string = "";
  nowFilterList : any = [];
  
  isSearching : boolean = false;
  showMagnifyingGlass : boolean = true;
  useFilter: boolean = false;
  
  constructor(private herbs_session: HerbSessionService) {
  }

  async ngOnInit(){
    this.herbs_session.getHerbProperty();
    this.herbs = await this.herbs_session.getHerbs();
  }  

  checkHerbName(word:string){
    this.wordSearching = word;
    let newHerbArray = [];
    if(word == '' && !this.useFilter){
      this.displayHerbs = [];
      this.isSearching = false;
    }
    else{
      for(let h of this.herbs){
        if((word == '' || h.nameTH.includes(word) || h._id.toLowerCase().includes(word.toLowerCase())) && this.passFilter(h)){
          newHerbArray.push(h);
        }
      }
    }

    this.displayHerbs = [...newHerbArray];
    this.herbs_search_number = this.displayHerbs.length;
  }

  search(word:string){
    word = word.replaceAll(" ", "")
    this.isSearching = true
    this.checkHerbName(word);
  }

  usefilter(filterList:any){
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
    // this.search(this.wordSearching);
    this.search(filterList[1][4]);
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

    let numPass = 0;
    for(let i=0; i<8; i++){
      if(this.nowFilterList[0][i] != 'ไม่ระบุ'){
        let hb = herbObject.taxonomy.find((x:any) => x.levelNo == i+1)
        if(hb != undefined && hb.value != this.nowFilterList[0][i]){
          return false;
        }
        else if(hb == undefined){
          numPass+=1;
        }
      }
    }
    if(numPass>=1){
      return false;
    }

    if(this.nowFilterList[1][0] != 'ไม่ระบุ' && !herbObject.propertie.includes(Number(this.nowFilterList[1][0]))) return false;
    if(this.nowFilterList[1][1] != 'ไม่ระบุ' && !herbObject.forbiddenperson.includes(Number(this.nowFilterList[1][1]))) return false;
    if(this.nowFilterList[1][2] != 'ไม่ระบุ' && !herbObject.substance.includes(Number(this.nowFilterList[1][2]))) return false;
    if(this.nowFilterList[1][3] != 'ไม่ระบุ' && !herbObject.side_effect.includes(Number(this.nowFilterList[1][3]))) return false;

    return true;
  }

  clearResult(){
    this.displayHerbs = [...[]];
    this.isSearching = false;
  }
}