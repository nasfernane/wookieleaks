import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
  }

  get userLogged() {
    return this.globalService.userLogged
  }

}
