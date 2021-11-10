import { Component } from '@angular/core';
import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wookie-leaks';

  constructor(
    private globalService: GlobalService,

  ) { }

  get userIsLogged() {
    return this.globalService.userLogged;
  }
}
