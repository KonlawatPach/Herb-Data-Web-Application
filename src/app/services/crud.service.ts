import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient,
  ) { }

  async getHerb(){
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/getherb";
    return await this.http.get<any>(url).toPromise();
  }
  async getHerbProperty(){
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/getherbproperty";
    return await this.http.get<any>(url).toPromise();
  }

  async updateHerb(nameEN: string, herbObject:any){
    var body = JSON.stringify({
      'nameEN': nameEN,
      'herbObject' : herbObject
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/updateherb";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
  
  async getUser(){
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/getalluser";
    return await this.http.get<any>(url).toPromise();
  }

  async registerUser(email:string, password:string, role:string){
    var body = JSON.stringify({
      "email" : email,
      "password" : password,
      "role" : role
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/register";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }

  async loginUser(email:string, password:string){
    var body = JSON.stringify({
      "email" : email,
      "password" : password
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/login";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }

  async acceptUser(email:string){
    var body = JSON.stringify({
      "email" : email
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/confirmuser";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }

  async deleteUser(email:string){
    var body = JSON.stringify({
      "email" : email
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app/deleteuser";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
}
