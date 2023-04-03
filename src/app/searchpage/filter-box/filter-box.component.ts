import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HerbSessionService } from 'src/app/services/herb-session.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  @Output() clearResult = new EventEmitter; 
  @Output() sendFilter = new EventEmitter;

  bioLabel : string[] = ["Kingdom", "Phylum", "Class", "Subclass", "Order", "Family", "Genus", "Species"];
  herbProperty : any = [];
  displayBio : any = [];
  isLoadingProperty : boolean = true;

  propertieValue: string = "ไม่ระบุ";
  propertieOption:any = [];
  forbiddenValue: string = "ไม่ระบุ";
  forbiddenOption:any = [];
  substanceValue: string = "ไม่ระบุ";
  substanceOption:any = [];
  side_effectValue: string = "ไม่ระบุ";
  side_effectOption:any = [];
  taxonomyValue= ['ไม่ระบุ','ไม่ระบุ','ไม่ระบุ','ไม่ระบุ','ไม่ระบุ','ไม่ระบุ','ไม่ระบุ','ไม่ระบุ'];

  constructor(
    private herb: HerbSessionService
  ) {
    this.loadFilterList();
  }

  ngOnInit(){
  }

  async loadFilterList(){
    let sessionState = sessionStorage.getItem('herbPropertyList');
    let undefinedObject = {
      _id: "ไม่ระบุ",
      propertie_description : "ไม่ระบุ",
      side_effect_description : "ไม่ระบุ",
      substance_description : "ไม่ระบุ",
      forbidden_description : "ไม่ระบุ"
    }

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
      this.herbProperty.propertie.splice(0, 0, undefinedObject);
      this.herbProperty.forbidden_person.splice(0, 0, undefinedObject);
      this.herbProperty.substance.splice(0, 0, undefinedObject);
      this.herbProperty.side_effect.splice(0, 0, undefinedObject);
      this.isLoadingProperty = false;
      this.setOptionValue()
      this.bioCheckingDisplay()
    }
  }

  bioCheckingDisplay(){
    this.displayBio = [['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ'],['ไม่ระบุ']];
    for(let hb of this.herbProperty.taxonomy){
      for(let hbIndex=0; hbIndex<hb.length; hbIndex++){
        if(!this.displayBio[hbIndex].includes(hb[hbIndex]) && hb[hbIndex]!=''){
          this.displayBio[hbIndex].push(hb[hbIndex]);
        }
      }
    }
  }

  shortstring(text:string){
    if(text.length > 80) return text.substring(0, 80) + "...";
    return text;
  }

  submit(searchBoxValue:string){
    let filterValue = [];
    //property dropdown
    if(this.propertieValue == null) this.propertieValue = 'ไม่ระบุ';
    if(this.forbiddenValue == null) this.forbiddenValue = 'ไม่ระบุ';
    if(this.substanceValue == null) this.substanceValue = 'ไม่ระบุ';
    if(this.side_effectValue == null) this.side_effectValue = 'ไม่ระบุ';
    filterValue.push(this.propertieValue);
    filterValue.push(this.forbiddenValue);
    filterValue.push(this.substanceValue);
    filterValue.push(this.side_effectValue);
    filterValue.push(searchBoxValue);

    // taxonomy dropdown
    for(let i=0; i<this.taxonomyValue.length;i++){
      if(this.taxonomyValue[i] == null) this.taxonomyValue[i] = 'ไม่ระบุ';
    }
    // let biofilterlist:any = document.getElementsByClassName("biofilterlist");
    // let newbiofilterlist = [];
    // for(let x=0; x<biofilterlist.length; x++) newbiofilterlist.push(biofilterlist[x].value);
    let sendValue = [this.taxonomyValue, filterValue];
    this.sendFilter.emit(sendValue);
  }

  clear(){
    let biofilterlist:any = document.getElementsByClassName("biofilterlist");
    let newbiofilterlist = [];
    for(let x=0; x<biofilterlist.length; x++) biofilterlist[x].value = 'ไม่ระบุ';
    this.propertieValue = "ไม่ระบุ";
    this.forbiddenValue = "ไม่ระบุ";
    this.substanceValue = "ไม่ระบุ";
    this.side_effectValue = "ไม่ระบุ";
  }

  setOptionValue(){
    for(let propertie of this.herbProperty.propertie){
      this.propertieOption.push({
        _id : propertie._id,
        description : propertie.propertie_description
      })
    }
    for(let forbidden of this.herbProperty.forbidden_person){
      this.forbiddenOption.push({
        _id : forbidden._id,
        description : forbidden.forbidden_description
      })
    }
    for(let substance of this.herbProperty.substance){
      this.substanceOption.push({
        _id : substance._id,
        description : substance.substance_description
      })
    }
    for(let side_effect of this.herbProperty.side_effect){
      this.side_effectOption.push({
        _id : side_effect._id,
        description : side_effect.side_effect_description
      })
    }
  }
}
