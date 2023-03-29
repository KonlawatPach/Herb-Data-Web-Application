import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-scrapingpage',
  templateUrl: './scrapingpage.component.html',
  styleUrls: ['./scrapingpage.component.scss']
})
export class ScrapingpageComponent implements OnInit {

  isJSONMode : boolean = false;
  isScraping : boolean = false;
  responseText:any = "";
  responseJSON:any = {};

  constructor(
    private crud: CrudService
  ) {}

  ngOnInit(): void {
  }

  async onSubmit(herbURL:string) {
    if(herbURL != ''){
      this.responseText = "";
      this.isScraping = true;
      let res = await this.crud.scraping(herbURL);

      this.isScraping = false;
      if(res!.startsWith("{")){       //string obj response
        this.responseJSON = JSON.parse(res!.replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))));
        this.responseJSON.botanic_propertie = this.responseJSON.botanic_propertie.map((obj:any) => Object.entries(obj)[0]);
        this.responseJSON.taxonomy = this.responseJSON.taxonomy.map((obj:any) => Object.entries(obj));
        this.isJSONMode = true;
        console.log(this.responseJSON);
      }
      else{                           //string response
        this.responseText = res;
        this.isJSONMode = false;
      }
      
    }
  }
}
