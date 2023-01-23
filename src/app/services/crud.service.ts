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
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // return from( 
    //   fetch(
    //     "https://data.mongodb-api.com/app/data-ijktw/endpoint/data/v1/action/findOne",
    //     {
    //       body: JSON.stringify(body),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Request-Headers': '*',
    //         'api-key': 'pBBxWErJ10vtVXKQTqnPpzsud688MlnMvkBSYiWW93vSBVLBDGD1OtpsqWcvTjDt',
    //         'Accept' : 'application/json'
    //       },
    //       method: 'post',
    //       mode: 'no-cors'
    //     }
    //   )
    // );
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
}
