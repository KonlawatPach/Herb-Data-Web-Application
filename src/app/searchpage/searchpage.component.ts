import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  @Input() herbs : any  = [];
  herbs_search_number : number = 0;

  displayHerbs : any = [];
  wordSearching : string = "";
  isSearching : boolean = false;
  

  constructor() {
    
  }

  ngOnInit(): void {
    this.displayHerbs = [...this.herbs];
    this.herbs_search_number = this.displayHerbs.length
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
