import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public x = 0;
  public firstclick = false;

  constructor() { }

  ngOnInit(): void {
  }

  clicking(){
    this.firstclick = true;
    this.evading();
  }
  evading(){
    if(this.firstclick){
      if(this.x == 0 || this.x == 1){
        this.x = -1;
      }else{
        this.x = 1;
      }
    }
  }
}
