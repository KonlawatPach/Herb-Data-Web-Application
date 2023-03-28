import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HerbSessionService } from '../services/herb-session.service';
import { CrudService } from '../services/crud.service';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-herb-detail',
  templateUrl: './herb-detail.component.html',
  styleUrls: ['./herb-detail.component.scss']
})
export class HerbDetailComponent implements OnInit {
  herb : any;
  herbproperty : any;
  herbpath : string = '';
  scienceName : string = '';

  finishLoading : boolean = false;
  isUpdating : boolean = false;
  isModifymode : boolean = false;

  constructor(
    private location: Location,
    private herbs_session: HerbSessionService,
    private crud: CrudService,
    public auth: AuthenticationService
  ) {
    this.herbpath = decodeURIComponent(location.path())
    this.herbpath = this.herbpath.split('/')[2];
    this.loadHerbData();
  }

  ngOnInit(){
  }

  async loadHerbData(){
    var herbs = await this.herbs_session.getHerbs();
    this.herbproperty = await this.herbs_session.getHerbProperty();
    this.herb = herbs.filter((obj:any) => {
      return obj.nameTH == this.herbpath
    })[0];

    this.herb.botanic_propertie = this.herb.botanic_propertie.map((obj:any) => Object.entries(obj)[0]);
    this.herb.biology = this.herb.taxonomy.map((obj:any) => Object.entries(obj));

    let titleCaseSuffig = ''
    if(this.herb.biology[this.herb.biology.length-1][2][1].split(/\s+/).length>1){
      titleCaseSuffig = this.herb.biology[this.herb.biology.length-1][2][1].split(/\s+/)[1]
      titleCaseSuffig = titleCaseSuffig[0].toUpperCase() + titleCaseSuffig.slice(1).toLowerCase();
    }
    else{
      titleCaseSuffig = this.herb.biology[this.herb.biology.length-1][2][1].slice(0, 1).toUpperCase()+this.herb.biology[this.herb.biology.length-1][2][1].slice(1).toLowerCase();
    }
    this.scienceName = `${this.herb.biology[this.herb.biology.length-2][2][1]} ${titleCaseSuffig}`;

    this.finishLoading = true;
  }

  modifymode(from:string){
    if((from == 'taga' && !this.isModifymode) || from != 'taga'){
      this.isModifymode = this.isModifymode?false:true;
    }
  }
  mapIDtoProperty(id:number, type:string){
    if(type == "pro") return this.herbproperty.propertie.find((obj:any) => obj._id == id).propertie_description;
    else if(type == "side") return this.herbproperty.side_effect.find((obj:any) => obj._id == id).side_effect_description;
    else if(type == "sub") return this.herbproperty.substance.find((obj:any) => obj._id == id).substance_description;
    else if(type == "for") return this.herbproperty.forbidden_person.find((obj:any) => obj._id == id).forbidden_description;
  }

  async submitModify(){
    this.isUpdating = true;
    let classNamelist = [ 'biology-detail', 
                          'description-detail', 
                          'botanic-title-detail', 
                          'botanic-content-detail', 
                          'propertie-detail', 
                          'substance-detail',
                          'sideeffect-detail', 
                          'forbiddenperson-detail', 
                        ];
    let herbObject:any = {};
    let botanicTitleArray = [];

    for(let classnameIndex in classNamelist){
      let propertyArray = [];
      let tag = document.getElementsByClassName(classNamelist[classnameIndex]);
      if(tag.length>0){
        for(let t in tag){
          let tagValue: any = tag[t];
          if(tagValue.value != undefined){
            propertyArray.push(tagValue.value)
          }
        }
      }
      
      switch (classNamelist[classnameIndex]) {
        case 'biology-detail':
          let biologyArray = []
          for(let b=0; b<this.herb.biology.length; b++) {
            biologyArray.push({
              'levelNo': this.herb.biology[b][0][1],
              'levelName': this.herb.biology[b][1][1],
              'value': propertyArray[b]
            })
          }
          herbObject.taxonomy = biologyArray;
          break;

        case 'description-detail':
          herbObject.description = propertyArray[0];
          break;
        
        case 'botanic-title-detail':
          botanicTitleArray = [...propertyArray];
          break;
        
        case 'botanic-content-detail':
          botanicTitleArray = [...propertyArray];
          let botanicArray = []
          for(let b=0; b<botanicTitleArray.length; b++) {
            botanicArray.push({
              botanicTitleArray: propertyArray[b]
            })
          }

          herbObject.botanic_propertie = botanicArray;
          break;
        
        case 'propertie-detail':
          if(propertyArray.length>0) herbObject.propertie = [propertyArray, this.herb.propertie];
          break;

        case 'substance-detail':
          if(propertyArray.length>0) herbObject.substance = [propertyArray, this.herb.substance];
          break;

        case 'sideeffect-detail':
          if(propertyArray.length>0) herbObject.side_effect = [propertyArray, this.herb.side_effect];
          break;

        case 'forbiddenperson-detail':
          if(propertyArray.length>0) herbObject.forbiddenperson = [propertyArray, this.herb.forbiddenperson];
          break;   
          
        default:
          break;
      }

    }
    await this.crud.updateHerb(this.herb._id, herbObject);
    sessionStorage.removeItem('herbs');
    sessionStorage.removeItem('herbPropertyList');
    await this.loadHerbData();
    console.log(this.herb._id, herbObject);
    this.isUpdating = false;
    alert("อัพเดทข้อมูลสมุนไพรเรียบร้อย");
    this.modifymode('');
  }
}
