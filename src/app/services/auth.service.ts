import { Injectable } from '@angular/core';  
@Injectable({  
  providedIn: 'root'  
})  
export class AuthenticationService {  
  login(){  
    localStorage.setItem('currentUser', "loggedin");  
  }  
  logout() {  
    localStorage.removeItem('currentUser');  
  }  
  public get isloggedIn(): boolean {  
    return (localStorage.getItem('currentUser') !== null);  
  }  
} 