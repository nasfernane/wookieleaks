import { Component, OnInit } from '@angular/core'; import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    if (this.globalService.userLogged) this.router.navigate(['/home']);
  }

  register() {
    const firstName = this.signupForm.value.firstName;
    const lastName = this.signupForm.value.lastName;
    const userName = this.signupForm.value.userName;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const passwordConfirm = this.signupForm.value.passwordConfirm;

    const accountCreated = this.authService.register(firstName, lastName, userName, email, password, passwordConfirm);

    if (accountCreated) {
      this.router.navigate(['/home']);
    }
  }

}
