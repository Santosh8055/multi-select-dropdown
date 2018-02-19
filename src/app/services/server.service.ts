import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ServerService {


  constructor(private httpClient: HttpClient) {
  }
  getStates(): Promise<any> {

    // trying to get data from the server which is created in server/server
    return this.httpClient.get('http://localhost:8888/states')
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        // in case of server did not start using online an service
        console.warn('Server is not started; using different server');
        return this.httpClient.get('https://api.myjson.com/bins/1fuqop')
          .toPromise().
          then(this.extractData)
          .catch(err => {
            console.error('Server not started provided by online service');
          })
      })
  }

  private extractData(res: Response) {
    return res || {};
  }




}
