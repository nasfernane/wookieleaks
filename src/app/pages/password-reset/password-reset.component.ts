import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetPwForm: FormGroup;
  validToken: boolean;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalService
  ) {
    this.validToken = true;
    this.resetPwForm = this.formBuilder.group({
      token: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }

  ngOnInit(): void {
    if (this.globalService.userLogged) this.router.navigate(['/home']);
    if (this.token) {
      this.resetPwForm.controls.token.setValue(this.token);
    }
  }

  async resetPw() {
    const token = this.resetPwForm.value.token;
    const password = this.resetPwForm.value.password;
    const passwordConfirm = this.resetPwForm.value.passwordConfirm;

    try {
      const pwIsReset = await this.authService.resetPw(token, password, passwordConfirm);
      this.validToken = true;
      this.router.navigate(['/login']);
    } catch (err) {
      this.validToken = false;
      console.error(err);
    }
  }

}
