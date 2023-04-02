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
  queueNumber:number = -1;

  constructor(
    private crud: CrudService
  ) {}

  ngOnInit(): void {
  }

  async onSubmit(herbURL:string) {
    if(herbURL != ''){
      this.responseText = "";
      this.queueNumber = -1;
      this.isScraping = true;
      this.crud.scraping(herbURL);
      this.loopRequest(herbURL);  
    }
  }

  async loopRequest(herbURL:string){
    setTimeout(() => {
      const interval = 8000;
      const timerId = setInterval(async () => {
        let res = await this.crud.status(herbURL);
        this.responseJSON = JSON.parse(res!.replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))));
        console.log(this.responseJSON);

        if (Number(this.responseJSON.status) == 1) {
          clearInterval(timerId);
          
          this.isScraping = false;
          if(typeof this.responseJSON === 'object'){       //string obj response
            this.responseJSON.botanic_propertie = this.responseJSON.botanic_propertie.map((obj:any) => Object.entries(obj)[0]);
            this.responseJSON.taxonomy = this.responseJSON.taxonomy.map((obj:any) => Object.entries(obj));
            this.isJSONMode = true;
          }
          else{                           //string response
            this.responseText = this.responseJSON.result;
            this.isJSONMode = false;
          }
        }
        else{
          this.queueNumber = Number(this.responseJSON.result);
        }
      }, interval);
    }, 5000)
  }
}
