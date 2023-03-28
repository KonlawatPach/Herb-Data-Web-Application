import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private prefixURL:string = "http://localhost:9000"
  // private prefixURL:string = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app"

  constructor(
    private http: HttpClient,
  ) { }

  async getHerb(){
    const url = this.prefixURL + "/getherb";
    return await this.http.get<any>(url).toPromise();
  }
  async getHerbProperty(){
    const url = this.prefixURL + "/getherbproperty";
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
    const url = this.prefixURL + "/updateherb";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
  
  async getUser(){
    const url = this.prefixURL + "/getalluser";
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
    const url = this.prefixURL + "/register";
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
    const url = this.prefixURL + "/login";
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
    const url = this.prefixURL + "/confirmuser";
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
    const url = this.prefixURL + "/deleteuser";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
}
