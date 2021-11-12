import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['email', 'first_name', 'last_name'];
  // users: any;
  dataSource;

  constructor(
    private userService: UserService,
    public globalService: GlobalService
  ) { }

  async ngOnInit() {
    this.globalService.breadcrumb = 'Rebels';
    this.dataSource = new MatTableDataSource(await this.userService.getAllUsers());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // const users = await this.userService.getAllUsers();
    // this.users = users;

    // this.users.forEach(user => {
    //   user.lastname = this.globalService.capitalize(user.lastname);
    //   user.firstname = this.globalService.capitalize(user.firstname);
    // });
  }
}
