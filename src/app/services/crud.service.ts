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
    // var body = JSON.stringify({
    //   "collection": "herb_lists",
    //   "database": "herb_data",
    //   "dataSource": "Cluster0",
    // });

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Access-Control-Request-Headers': '*',
    //     'api-key': 'pBBxWErJ10vtVXKQTqnPpzsud688MlnMvkBSYiWW93vSBVLBDGD1OtpsqWcvTjDt',
    //     'Accept' : 'application/json'
    //   })
    // };

    // const url = "https://data.mongodb-api.com/app/data-ijktw/endpoint/data/v1";
    // return this.http.post(url, body, httpOptions).subscribe();
    const url = "http://localhost:9000/getherb";
    return await this.http.get<any>(url).toPromise();
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
