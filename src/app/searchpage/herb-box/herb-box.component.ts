import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-herb-box',
  templateUrl: './herb-box.component.html',
  styleUrls: ['./herb-box.component.scss']
})
export class HerbBoxComponent implements OnInit {
  @Input() herb:any = {}

  constructor() { }

  ngOnInit(): void {
  }

}
