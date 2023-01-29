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
    const url = "http://localhost:9000/getherb";
    return await this.http.get<any>(url).toPromise();
  }
  async getHerbProperty(){
    const url = "http://localhost:9000/getherbproperty";
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
    const url = "http://localhost:9000/updateherb";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
  
  async getUser(){
    const url = "http://localhost:9000/getalluser";
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
    const url = "http://localhost:9000/register";
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
    const url = "http://localhost:9000/login";
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
    const url = "http://localhost:9000/confirmuser";
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
    const url = "http://localhost:9000/deleteuser";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
}
