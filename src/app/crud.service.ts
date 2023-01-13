import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  async test(){
    // const uri = "mongodb+srv://KonlawatPach:ppaacchh2543@cluster0.ufqqckp.mongodb.net/?retryWrites=true&w=majority";
    // const client = new MongoClient(uri)
    // const dbName = 'herb_lists';

    // // Use connect method to connect to the server
    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('herb_data');

    // // the following code examples can be pasted here...

    // return collection;
  }
}
