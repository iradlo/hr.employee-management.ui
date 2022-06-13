import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ILoginData } from "./login-data";
import { LoginService } from "./login.service";

@Component({
  selector: 'hw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  logIn() {
    if (!this.loginForm.valid) {
      return;
    }

    this.loginService.signIn(this.loginForm.value).subscribe({
      next: x => { console.log('User sign in. User = ', x) },
      error: err => this.errorMessage = err
    });
  }

  registerUser() {
    if (!this.loginForm.valid) {
      return;
    }

    this.loginService.signUp(this.loginForm.value).subscribe({
      next: x => { console.log('User sign up'); this.loginForm.reset; },
      error: err => this.errorMessage = err
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }
}