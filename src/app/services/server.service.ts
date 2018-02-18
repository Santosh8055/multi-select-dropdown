import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ServerService {


  statesData = {};

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('http://localhost:8888/states')
      .subscribe((data) => {
        this.statesData = data
      });
  }
  getStates(): Promise<any> {

    return this.httpClient.get('http://localhost:8888/states')
      .toPromise();
  }



}
