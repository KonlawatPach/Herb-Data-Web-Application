import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HerbSessionService } from 'src/app/services/herb-session.service';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  @Output() closeFilter = new EventEmitter;
  @Output() sendFilter = new EventEmitter;

  bioLabel : string[] = ["Kingdom", "Phylum", "Class", "Subclass", "Order", "Family", "Genus", "Species"];
  herbProperty : any = [];

  displayBio : any = [];

  isLoadingProperty : boolean = true;

  constructor(
    private herb: HerbSessionService
  ) {
    this.loadFilterList();
  }

  ngOnInit(){
  }

  async loadFilterList(){
    let sessionState = sessionStorage.getItem('herbPropertyList');
    if(sessionState == ''){
      setTimeout(() => {
        this.loadFilterList();
      }, 1000);
    }
    else if(sessionState == null){
      this.herb.getHerbProperty();
    }
    else{
      this.herbProperty = JSON.parse(sessionState);
      this.herbProperty.propertie.splice(0, 0, 'ไม่ระบุ');
      this.herbProperty.forbidden_person.splice(0, 0, 'ไม่ระบุ');
      this.herbProperty.substance.splice(0, 0, 'ไม่ระบุ');
      this.herbProperty.side_effect.splice(0, 0, 'ไม่ระบุ');
      this.isLoadingProperty = false;
      this.bioCheckingDisplay()
    }
  }

  bioCheckingDisplay(){
    this.displayBio = [['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ']];
    for(let hb of this.herbProperty.biology){
      for(let hbIndex=0; hbIndex<hb.length; hbIndex++){
        if(!this.displayBio[hbIndex].includes(hb[hbIndex]) && hb[hbIndex]!=''){
          this.displayBio[hbIndex].push(hb[hbIndex]);
        }
      }
    }
  }


  shortstring(text:string){
    if(text.length > 80) return text = text.substring(0, 80) + "...";
    return text;
  }

  submit(filterValue:any){
    let biofilterlist:any = document.getElementsByClassName("biofilterlist");
    let newbiofilterlist = [];
    for(let x=0; x<biofilterlist.length; x++) newbiofilterlist.push(biofilterlist[x].value);
    let sendValue = [newbiofilterlist, filterValue];
    this.sendFilter.emit(sendValue);
  }
}
