import { Component, OnInit } from '@angular/core';
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
  userEmail: string
  constructor(private authService: AuthService,
    private adminService: AdminBirthdayService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getOrders();
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
  emailtOrders: any;
  orderProfileAray: Array<any>;
  allPrice: number;
  time: string;
  date: string;
  packageName: string;
  countPeoples: string;
  statusOrder: string;
  private getOrders(): void {
    const myProfile = JSON.parse(localStorage.getItem('myProfile'));
    this.allPrice = myProfile.allPrice;
    this.time = myProfile.time;
    this.date = myProfile.date;
    this.packageName = myProfile.packageName;
    this.countPeoples = myProfile.countPeoples;
    this.statusOrder = myProfile.statusOrder;
    console.log(myProfile)
  }


  // private getOrders(): void {
  //   this.adminService.getFireCloudOrder().subscribe(
  //     colection => {
  //       this.orderAdminAray = colection.map(document => {
  //         const id = document.payload.doc.id;
  //         // console.log(id)
  //         const data = document.payload.doc.data() as any;
  //         return { id, ...data };
  //       })
  //       if (localStorage.getItem('user')) {
  //         this.emailtOrders = JSON.parse(localStorage.getItem('user'));
  //         this.userEmail = this.emailtOrders.userEmail
  //         console.log(this.userEmail, "local");
  //         for (let i = 0; i < this.orderAdminAray.length; i++) {
  //           // console.log(this.orderAdminAray[i]);
  //           if (this.orderAdminAray[i].email === this.userEmail) {
  //             console.log(this.orderAdminAray[i].email, "перевірка чи є  такий користувач");
  //           }
  //         }
  //       }
  //     }
  //   )
  // }
}
