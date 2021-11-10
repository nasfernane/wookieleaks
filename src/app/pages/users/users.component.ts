import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(
    private userService: UserService,
    private globalService: GlobalService
  ) { }

  async ngOnInit() {
    const users = await this.userService.getAllUsers();
    this.users = users;
    console.log(this.users);

    this.users.forEach(user => {
      user.lastname = this.globalService.capitalize(user.lastname);
      user.firstname = this.globalService.capitalize(user.firstname);
    });
  }
}
