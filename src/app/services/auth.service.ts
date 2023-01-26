import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Router } from '@angular/router';

@Injectable({  
  providedIn: 'root'  
})  
export class AuthenticationService {
  constructor(
    private crud: CrudService,
    private router: Router
  ) {
    
  }

  login(email: string){  
    return localStorage.setItem('currentUser', btoa(email));
  }  
  logout() {  
    localStorage.removeItem('currentUser'); 
    this.router.navigate(['/ ']); 
  }  
  public get isloggedIn(): boolean {  
    return (localStorage.getItem('currentUser') !== null);  
  }
  public get getCurrentUser(): string {  
    return localStorage.getItem('currentUser')!;  
  }
} 