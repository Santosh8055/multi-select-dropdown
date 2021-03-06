import { Component } from '@angular/core';
import { ServerService } from './services/server.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  states: any[];
  public singleSelectStates: any[];
  public multiSelectStates: any[];
  public dataListStates: any[];

  public singleSelectedValue: any = ['', ''];
  public multiSelectedData: any[] = [];
  public placeholder = 'State';

  multiple: boolean = true;
  single: boolean = false;
  constructor(private server: ServerService) {

    // Getting data from the server and assiging to required variables
    this.server.getStates().then((data) => {

      // Data will be loaded asyncronously using
      this.states = Object.keys(data).map((k) => {
        return [k, data[k], false];
      });

      // Data fetched will be copied to three different variables for access
      this.singleSelectStates = JSON.parse(JSON.stringify(this.states));
      this.multiSelectStates = JSON.parse(JSON.stringify(this.states));
      this.dataListStates = JSON.parse(JSON.stringify(this.states));

    });
  }
}
