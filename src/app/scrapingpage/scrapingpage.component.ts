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
      await this.crud.scraping(herbURL);
      this.loopRequest(herbURL);  
    }
  }

  async loopRequest(herbURL:string){
    let countTimeout = 0; 

    setTimeout(() => {
      const interval = 8000;
      const timerId = setInterval(async () => {
        let res = await this.crud.status(herbURL);
        this.responseJSON = JSON.parse(res!.replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))));

        console.log(this.responseJSON);
        if (Number(this.responseJSON.status) == 1) {
          
          if(typeof this.responseJSON.result === 'string'){       //string response
            if(this.responseJSON.result == "Sorry in our Code have some problem to scraping this url"){
              countTimeout++;
            }
            else if(this.responseJSON.result != "Sorry in our Code have some problem to scraping this url" || countTimeout > 3){
              this.responseText = this.responseJSON.result;
              this.isJSONMode = false;
              clearInterval(timerId);
              this.isScraping = false;
            }
            
          }
          else{                                                   //obj response
            clearInterval(timerId);
            this.isScraping = false;
            this.responseJSON.botanic_propertie = this.responseJSON.botanic_propertie.map((obj:any) => Object.entries(obj)[0]);
            this.responseJSON.taxonomy = this.responseJSON.taxonomy.map((obj:any) => Object.entries(obj));
            this.isJSONMode = true;
          }
        }
        else{
          this.queueNumber = Number(this.responseJSON.result);
        }
      }, interval);
    }, 5000)
  }
}
