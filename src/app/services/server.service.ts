import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ServerService {


  constructor(private httpClient: HttpClient) {
  }
  getStates(): Promise<any> {

    return this.httpClient.get('http://localhost:8888/states')
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        console.warn('server is not started; using different server');

        return this.httpClient.get('https://api.myjson.com/bins/1fuqop')
          .toPromise()
      })
  }

  private extractData(res: Response) {
    return res || {};
  }




}
