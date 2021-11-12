import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    public globalService: GlobalService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.globalService.breadcrumb = 'Holo Profile';
    this.user = await this.authService.getCurrentUser();
  }

}
