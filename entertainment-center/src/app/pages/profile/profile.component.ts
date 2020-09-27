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
  constructor(private authService: AuthService,
    private adminService: AdminBirthdayService,
    private fireCloud: AngularFirestore) { }

  ngOnInit(): void {
    this.getUserData();
    this.getOrders();
    this.getEmeilUser();
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
  // emailtOrders: any;
  // orderProfileAray: Array<any>;
  allPrice: number;
  time: string;
  date: string;
  packageName: string;
  countPeoples: string;
  statusOrder: string;

  // private getOrders(): void {
  //   // const myProfile = JSON.parse(localStorage.getItem('myProfile'));
  //   // this.allPrice = myProfile.allPrice;
  //   // this.time = myProfile.time;
  //   // this.date = myProfile.date;
  //   // this.packageName = myProfile.packageName;
  //   // this.countPeoples = myProfile.countPeoples;
  //   // this.statusOrder = myProfile.statusOrder;
  //   // console.log(myProfile)
  // }


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
  emailtOrders: any;
  userEmail = "admin";
  private getEmeilUser() {
    if (localStorage.getItem('user')) {
      this.emailtOrders = JSON.parse(localStorage.getItem('user'));
      this.userEmail = this.emailtOrders.userEmail
      console.log(this.userEmail)
    } else {
    }
  }
  userOrders: Array<any> = []
  previousOrder: any;
  private getOrders(): void {
    if (this.userEmail != '') {
      this.fireCloud.collection('orders').ref.where('email', '==', this.userEmail)
        .onSnapshot(
          collection => {
            collection.forEach(document => {
              const data = document.data() as any;
              const id = document.id;
              console.log(data);
              console.log(id);
              this.userOrders.push({ id, ...data });
              console.log(this.userOrders);
              this.previousOrder = this.userOrders.slice(-1)[0];
              console.log(this.previousOrder);
              // this.orderIDB = this.previousOrder.id;
              // this.dateB = this.previousOrder.date;
              // this.namePeopleOrder = this.previousOrder.namePeople;
              // this.counterPeopleB = this.previousOrder.countPeoples;
              // this.packageName = this.previousOrder.packageName;
              // this.statusOrder = this.previousOrder.statusOrder;
              // this.phoneNumber = this.previousOrder.phone;
              // this.entertainmentAray = this.previousOrder.entertainmentOrder;
              // this.userPhone = this.previousOrder.userPhone;
            });
            // console.log(this.orderIDB);
            // console.log(this.dateB);
            // console.log(this.namePeopleOrder);
            // console.log(this.packageName);
            // console.log(this.statusOrder);
            // console.log(this.entertainmentAray);
            // console.log(this.entertainmentAray[0].nameGame);
            // console.log(this.counterPeopleB);
          }
        )
    }
  }
}
