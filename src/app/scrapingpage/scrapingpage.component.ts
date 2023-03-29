import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-scrapingpage',
  templateUrl: './scrapingpage.component.html',
  styleUrls: ['./scrapingpage.component.scss']
})
export class ScrapingpageComponent implements OnInit {

  isScraping:boolean = false;
  responseText:any = ". . .";

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
      this.responseText = res;
    }
  }
}
