import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;
  userEmail: string
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userEmail = user.userEmail
    this.email = user.email;
    this.firstName = user.userFirstName;
    this.lastName = user.userLastName;

  }

  signOut(): void {
    this.authService.SignOut();
  }

}
