import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;

  loginStatus: boolean;
  loginUrl: string;
  loginName: string;

  switch: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.authService.login(this.userEmail, this.userPassword);
    console.log(this.userEmail, this.userPassword)
    this.resetForm();
  }

  registerUser(): void {
    this.authService.signUp(this.userEmail,
      this.userPassword,
      this.firstName,
      this.lastName);
    this.resetForm();
    this.switch = !this.switch
    this.loginUrl = 'profile';
  }

  switchForm(): void {
    this.switch = !this.switch;
  }

  private resetForm(): void {
    this.userEmail = '';
    this.userPassword = '';
    this.firstName = '';
    this.lastName = '';
  }

}