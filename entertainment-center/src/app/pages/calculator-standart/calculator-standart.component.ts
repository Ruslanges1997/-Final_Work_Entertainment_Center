import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEntertainment } from '../../shared/interfaces/entertainment.interface';
import { EntertainmentService } from '../../shared/services/entertainment.service';
import { CalculatorService } from '../../shared/services/calculator.service';

import { CalculatorStandart } from '../../shared/models/calculator-standart.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICalculatorStandart } from 'src/app/shared/interfaces/calculator-standart.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calculator-standart',
  templateUrl: './calculator-standart.component.html',
  styleUrls: ['./calculator-standart.component.scss']
})

export class CalculatorStandartComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private entertainmentService: EntertainmentService,
    private router: Router,
    private calculatorService: CalculatorService,
    private fireCloud: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getEntertainment();
    this.totalStand();
  }
  userOrders: Array<ICalculatorStandart> = [];
  previousOrder: ICalculatorStandart;
  countGamePackage = 2;
  packageName = "Пакет Стандарт"
  email: any;
  statusOrder: string;
  orderEmail: any;
  emailtOrders: any;
  userEmail = "admin";
  totalStandatr: number = 0;
  disBtnCounPeople: boolean = false;
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
  }
  openModalTime(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }
 
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
  
  private totalStand(): void {
    this.totalStandatr = this.totalPriceEntertainment * this.counterPeople
  }
 
  private getEmeilUser() {
    if (localStorage.getItem('user')) {
      this.emailtOrders = JSON.parse(localStorage.getItem('user'));
      this.userEmail = this.emailtOrders.userEmail
      console.log(this.userEmail)
    } else {
    }
  }
 
  private getStausPriofile(): void {
    this.getEmeilUser();
    if (this.userEmail == 'admin') {
      this.router.navigateByUrl('/order-birthday');
    }
    else if (this.userEmail !== 'admin') {
      this.router.navigateByUrl('/profile');
    }
  }
 
  addBirthdayFire(): void {
    this.getStausPriofile();
    const order = new CalculatorStandart(
      this.orderIDB,
      this.timeB,
      this.dateB.toString(),
      this.counterPeopleB,
      this.namePeopleOrder,
      this.phoneNumber,
      this.totalStandatr,
      this.entertainmentAray,
      this.countGamePackage,
      this.packageName,
      this.statusOrder,
      this.userEmail
    );
    delete order.id;
    this.calculatorService.postFireCloudOrder({ ...order })
      .then(() => this.resetOrder())
      .catch(err => console.log(err));
  }
}



