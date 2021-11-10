import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private auth: AuthService,

  ) { }

  ngOnInit(): void {
  }

  get userIsLogged() {
    return this.globalService.userLogged;
  }

  get currentUserName() {
    return this.globalService.currentUserName;
  }

  logout() {
    this.auth.logout();
  }

}
