import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { ICalculatorStandart } from 'src/app/shared/interfaces/calculator-standart.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminBirthdayService } from '../../shared/services/admin-birthday.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;
  switch: boolean;
  userOrders: Array<any> = [];
  previousOrder: any;
  allPrice: number;
  time: string;
  date: string;
  packageName: string;
  countPeoples: string;
  statusOrder: string;
  emailtOrders: any;
  userEmail = "admin";

  constructor(private authService: AuthService,
    private adminService: AdminBirthdayService,
    private fireCloud: AngularFirestore) { }

  ngOnInit(): void {
    this.getUserData();
    this.getOrders();
    this.getEmeilUser();
  }

  private swichBlock(): void {
    if (this.userOrders.length > 0) {
      this.switch = true;
    } else if (this.userOrders.length == 0) {
      this.switch = false;
    }
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

  private getEmeilUser() {
    if (localStorage.getItem('user')) {
      this.emailtOrders = JSON.parse(localStorage.getItem('user'));
      this.userEmail = this.emailtOrders.userEmail
    }
  }

  private getOrders(): void {
    if (this.userEmail != '') {
      this.fireCloud.collection('orders').ref.where('email', '==', this.userEmail)
        .onSnapshot(
          collection => {
            collection.forEach(document => {
              const data = document.data() as any;
              const id = document.id;
              this.userOrders.push({ id, ...data });
              this.swichBlock();
            });
          }
        )
      this.swichBlock();
    }
  }
}
