import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {
  allUser : any = [];
  buttonState : any = [];
  requestUser : any = [];
  registedUser : any = [];

  isLoading : boolean = true;

  constructor(
    private crud : CrudService
  ) {
    this.loadUser();
  }

  ngOnInit(){
  }

  async loadUser(){
    this.allUser = await this.crud.getUser();
    this.requestUser = this.allUser.filter((obj:any) => {
      return obj.userstatus == 'request'
    });
    this.registedUser = this.allUser.filter((obj:any) => {
      return obj.userstatus == 'confirm'
    });
    this.buttonState = Array(this.requestUser.length).fill(false);
    this.isLoading = false;
  }

  async acceptUser(buttonindex:number, email:string){
    this.buttonState[buttonindex] = true;
    await this.crud.acceptUser(email);
    this.loadUser()
  }

  async refuseUser(buttonindex:number, email:string){
    this.buttonState[buttonindex] = true;
    await this.crud.deleteUser(email);
    this.loadUser()
  }

}
