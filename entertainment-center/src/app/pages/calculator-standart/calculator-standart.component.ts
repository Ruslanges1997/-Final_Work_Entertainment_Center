import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEntertainment } from '../../shared/interfaces/entertainment.interface';
import { EntertainmentService } from '../../shared/services/entertainment.service';
import { CalculatorService } from '../../shared/services/calculator.service';

import { CalculatorStandart } from '../../shared/models/calculator-standart.model';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICalculatorStandart } from 'src/app/shared/interfaces/calculator-standart.interface';
@Component({
  selector: 'app-calculator-standart',
  templateUrl: './calculator-standart.component.html',
  styleUrls: ['./calculator-standart.component.scss']
})

export class CalculatorStandartComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private entertainmentService: EntertainmentService,
    private calculatorService: CalculatorService,
    private fireCloud: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getEntertainment();
    this.totalStand();
    // this.getOrders();

  }
  dateBirhdayArr: string[] = [];

  phoneNumber: number;
  timeDateFor
  namePeopleOrder: string;
  entertainmentAray: Array<IEntertainment> = []
  entertainment: string;
  orderIDB = 1;
  timeB: string;
  dateB: string;
  counterPeopleB: number;
  totalPriceProd = 0;
  counterPeople = 2;
  totalPriceEntertainment = 300;
  modalRef: BsModalRef;

  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  private getEntertainment(): void {
    this.entertainmentService.getFireCloudEntertainment().subscribe(data => {
      this.entertainmentAray = data.map(document => {
        const data = document.payload.doc.data() as IEntertainment;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
    })
    this.getEmeilUser();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateBirhdayArr.splice(0, 1, `${type}: ${event.value}`);
    // console.log(this.dateBirhdayArr)
  }
  openModalTime(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  disBtnCounPeople: boolean = false;
  countPeople(status: boolean): void {
    if (status && this.counterPeople <= 13) {
      if (this.counterPeople == 13) {
        this.disBtnCounPeople = true;
      }
      this.counterPeople++;
      this.totalStand();
    }
    else {
      if (this.counterPeople > 2) {
        this.counterPeople--;
        this.disBtnCounPeople = false;
        this.totalStand();
      }
    }
    this.counterPeopleB = this.counterPeople;
  }

  setValue(value: string) {
    this.timeB = value;
    this.modalRef.hide();
  }

  closeModal(): void {
    this.modalRef.hide();
  }
  private resetOrder(): void {
    this.counterPeople = 2;
    this.totalStand();
    this.dateBirhdayArr = [];
    this.phoneNumber = null;
    this.namePeopleOrder = "";
    this.timeB = '';
  }

  totalStandatr: number = 0;
  private totalStand(): void {
    this.totalStandatr = this.totalPriceEntertainment * this.counterPeople
  }
  packageName = "Пакет Стандарт"
  email: any;
  statusOrder: string;
  orderEmail: any;
  // private getOrders(): void {
  //   // this.calculatorService.getFireCloudOrder().subscribe(data => {
  //   //   this.orderEmail = data.map(document => {
  //   //     const data = document.payload.doc.data() as any;
  //   //     const id = document.payload.doc.id;
  //   //     return { id, ...data }
  //   //   })

  //   // })

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
  userOrders: Array<ICalculatorStandart> = []
  previousOrder: ICalculatorStandart;
  // private getOrders(): void {
  //   if (this.userEmail != '') {
  //     this.fireCloud.collection('orders').ref.where('email', '==', this.userEmail)
  //       .onSnapshot(
  //         collection => {
  //           collection.forEach(document => {
  //             const data = document.data() as ICalculatorStandart;
  //             const id = document.id;
  //             console.log(data);
  //             console.log(id);
  //             this.userOrders.push({ id, ...data });
  //             console.log(this.userOrders);
  //             this.previousOrder = this.userOrders.slice(-1)[0];
  //             console.log(this.previousOrder);
  //             this.orderIDB = this.previousOrder.id;
  //             this.dateB = this.previousOrder.date;
  //             this.namePeopleOrder = this.previousOrder.namePeople;
  //             this.counterPeopleB = this.previousOrder.countPeoples;
  //             this.packageName = this.previousOrder.packageName;
  //             this.statusOrder = this.previousOrder.statusOrder;
  //             this.phoneNumber = this.previousOrder.phone;
  //             this.entertainmentAray = this.previousOrder.entertainmentOrder;
  //             // this.userPhone = this.previousOrder.userPhone;
  //           });
  //           console.log(this.orderIDB);
  //           console.log(this.dateB);
  //           console.log(this.namePeopleOrder);
  //           console.log(this.packageName);
  //           console.log(this.statusOrder);
  //           console.log(this.entertainmentAray);
  //           console.log(this.entertainmentAray[0].nameGame);
  //           console.log(this.counterPeopleB);
  //         }
  //       )
  //   }
  // }
  addBirthdayFire(): void {
    const order = new CalculatorStandart(
      this.orderIDB,
      this.timeB,
      this.dateB.toString(),
      this.counterPeopleB,
      this.namePeopleOrder,
      this.phoneNumber,
      this.totalStandatr,
      this.entertainmentAray,
      this.packageName,
      this.statusOrder,
      // this.email = this.userEmail
      this.userEmail
    );
    // localStorage.setItem('myProfile', JSON.stringify(order));
    delete order.id;
    console.log(order)
    this.calculatorService.postFireCloudOrder({ ...order })
      .then(() => this.resetOrder())
      .catch(err => console.log(err));
  }
}
