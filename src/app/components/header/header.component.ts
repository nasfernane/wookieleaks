import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public globalService: GlobalService,
    public authService: AuthService,

  ) { }
}
