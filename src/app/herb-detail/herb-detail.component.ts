import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HerbSessionService } from '../services/herb-session.service';

@Component({
  selector: 'app-herb-detail',
  templateUrl: './herb-detail.component.html',
  styleUrls: ['./herb-detail.component.scss']
})
export class HerbDetailComponent implements OnInit {
  finishLoading : boolean = false;
  herb : any;
  herbpath : string = '';
  scienceName : string = '';

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

}
