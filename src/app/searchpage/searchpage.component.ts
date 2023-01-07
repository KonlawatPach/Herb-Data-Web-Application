import { Component, OnInit } from '@angular/core';
import { Schema, model, connect } from 'mongoose';


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})

export class SearchpageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  async search(){
    console.log("search!!")
  }
}
