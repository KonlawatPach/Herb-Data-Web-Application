import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HerbSessionService } from '../services/herb-session.service';

@Component({
  selector: 'app-herb-detail',
  templateUrl: './herb-detail.component.html',
  styleUrls: ['./herb-detail.component.scss']
})
export class HerbDetailComponent implements OnInit {
  herb : any;
  herbpath : string = '';
  scienceName : string = '';

  finishLoading : boolean = false;
  isModifymode : boolean = false;

  constructor(
    private location: Location,
    private herbs_session: HerbSessionService,
  ) {
    this.herbpath = decodeURIComponent(location.path())
    this.herbpath = this.herbpath.split('/')[2]
  }

  async ngOnInit(){
    var herbs = await this.herbs_session.getHerbs();
    this.herb = herbs.filter((obj:any) => {
      return obj.nameTH == this.herbpath
    })[0];

    this.herb.botanic_propertie = this.herb.botanic_propertie.map((obj:any) => Object.entries(obj)[0]);
    this.herb.biology = this.herb.biology.map((obj:any) => Object.entries(obj));

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

  submitModify(){
    let classNamelist = [ 'biology-detail', 
                          'description-detail', 
                          'botanic-title-detail', 
                          'botanic-content-detail', 
                          'propertie-detail', 
                          'substance-detail',
                          'sideeffect-detail', 
                          'forbiddenperson-detail', 
                        ];
    for(let classnameIndex in classNamelist){
      let tag = document.getElementsByClassName(classNamelist[classnameIndex]);
      if(tag.length>0){
        console.log(classNamelist[classnameIndex]);
        for(let t in tag){
          let x: any = tag[t];
          if(x.value != undefined){
            console.log(x.value);
          }
        }
      }
      console.log('------------------------------------');
    }
    
  }

}
