import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  userSearchForm: FormGroup;
  user: any;
  validSearch = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private globalService: GlobalService
  ) {
    this.userSearchForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }

  ngOnInit(): void {
  }

  async searchUser() {
    try {
      this.user = await this.userService.getUserFromEmail(this.userSearchForm.controls.email.value);
      this.validSearch = true;
      this.user.lastname = this.globalService.capitalize(this.user.lastname);
      this.user.firstname = this.globalService.capitalize(this.user.firstname);

    } catch (err) {
      console.error(err);
      this.validSearch = false;
      this.user = {};
    }

  }
}
