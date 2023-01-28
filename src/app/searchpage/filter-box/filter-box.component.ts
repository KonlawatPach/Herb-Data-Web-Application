import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  @Output() closeFilter = new EventEmitter;
  @Output() sendFilter = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  submit(){

  }
}
