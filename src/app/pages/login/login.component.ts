import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router,
  ) {
    this.validLogin = true;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    if (this.globalService.userLogged) this.router.navigate(['/home']);
  }

  async login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    try {
      await this.authService.login(email, password);
      this.validLogin = false;
      this.globalService.userLogged = true;
      this.router.navigate(['/profile']);
    } catch (err) {
      this.validLogin = false;
      console.error(err);
    }
  }

}
