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
    this.finishLoading = true;
  }

}
