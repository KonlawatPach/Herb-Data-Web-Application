import { Component, OnInit, ViewChild } from '@angular/core';
import { HerbSessionService } from 'src/app/services/herb-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toptwelveherbs-container',
  templateUrl: './toptwelveherbs-container.component.html',
  styleUrls: ['./toptwelveherbs-container.component.scss']
})
export class ToptwelveherbsContainerComponent implements OnInit {
  @ViewChild('searchword') searchwordBox: any;
  herbs : any  = [];
  herbs_search_number : number = 0;

  displayHerbs : any = [];
  wordSearching : string = "";
  
  isSearching : boolean = false;
  showMagnifyingGlass : boolean = true;
  

  constructor(
    private herbs_session: HerbSessionService,
    private router: Router
    ){
  }
  async ngOnInit(){
    this.herbs = await this.herbs_session.getHerbs();
    this.displayHerbs = [...this.herbs];
    this.herbs_search_number = this.displayHerbs.length
  }  

  search(word:string){
    word = word.replace(" ", "");
    if(word == "") word = "     ";
    sessionStorage.setItem("searchwordfromhomepage", word);
    this.router.navigate(['/search']);
  }

}
