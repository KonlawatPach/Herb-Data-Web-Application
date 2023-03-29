import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // private prefixURL:string = "http://localhost:9000"
  private prefixURL:string = "https://us-central1-thaiherb-fbcfd.cloudfunctions.net/app"
  // private prefixScrapingURL:string = "http://127.0.0.1:5000"
  private prefixScrapingURL:string = "https://thaiherb-fbcfd.as.r.appspot.com"

  constructor(
    private http: HttpClient,
  ) { }

  //SCRAPING DATA MANAGE
  async scraping(urlText:string){
    const url = this.prefixScrapingURL + "/scraping?url=" + urlText;
    const textResponse = await this.http.get(url, {responseType: 'text'}).toPromise();
    return textResponse;
  }


  //HERB DATA MANAGE

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
  
  //USER DATA MANAGE

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
