import { Component, OnInit } from '@angular/core'; import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router'
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.scss']
})
export class PasswordLostComponent implements OnInit {
  lostPwForm: FormGroup;
  pwResetSuccess: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.pwResetSuccess = true;
    this.lostPwForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }

  ngOnInit(): void {
    if (this.globalService.userLogged) this.router.navigate(['/home']);
  }

  async lostPw() {
    const email = this.lostPwForm.value.email;

    try {
      const pwIsReset = await this.authService.lostPw(email);
      this.pwResetSuccess = true;
      this.router.navigate(['/password-reset']);
    } catch (err) {
      this.pwResetSuccess = false;
      console.error(err);
    }
  }

}
