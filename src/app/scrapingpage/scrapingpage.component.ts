import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrapingpage',
  templateUrl: './scrapingpage.component.html',
  styleUrls: ['./scrapingpage.component.scss']
})
export class ScrapingpageComponent implements OnInit {
  public herbName: string = "";

  onSubmit() {
    // TODO: handle form submission
  }

  constructor() { }

  ngOnInit(): void {
  }

}
