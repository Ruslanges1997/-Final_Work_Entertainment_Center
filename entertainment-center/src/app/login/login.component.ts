import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userPassword: string;
  firstName: string;
  lastName: string;
  loginStatus: boolean;
  loginUrl: string;
  loginName: string;
  userEmail: string;
  acceptTerms: any;
  registerForm: FormGroup;
  submitted = false;
  loginForm: FormGroup;
  form: FormGroup;
  userEmailLogin: string;
  userPasswordLogin: string;
  switch: boolean;
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue]
      },
    );
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
  get l() { return this.form.controls; }

  loginUser() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.userEmailLogin, this.userPasswordLogin);
    this.loginUrl = 'profile';
    this.form.reset();
  }
  switchForm(): void {
    this.switch = !this.switch;
  }
  

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.signUp(this.userEmail,
      this.userPassword,
      this.firstName,
      this.lastName);
    this.switch = !this.switch
    this.loginUrl = 'profile';
    this.onReset();
  }

  private onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}