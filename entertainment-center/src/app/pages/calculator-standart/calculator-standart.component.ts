import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEntertainment } from '../../shared/interfaces/entertainment.interface';
import { EntertainmentService } from '../../shared/services/entertainment.service';
import { CalculatorService } from '../../shared/services/calculator.service';

import { CalculatorStandart } from '../../shared/models/calculator-standart.model';
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
  ) { }

  ngOnInit(): void {
    this.getEntertainment();
    this.totalStand();
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
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateBirhdayArr.splice(0, 1, `${type}: ${event.value}`);
    console.log(this.dateBirhdayArr)
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

  addBirthdayFire(): void {
    const order = new CalculatorStandart(
      this.orderIDB,
      this.timeB,
      this.dateB,
      this.counterPeopleB,
      this.namePeopleOrder,
      this.phoneNumber,
      this.totalStandatr,
      this.entertainmentAray,
      this.packageName,
    );
    delete order.id;
    console.log(order)
    this.calculatorService.postFireCloudOrder({ ...order })
      .then(() => this.resetOrder())
      .catch(err => console.log(err));
  }
}
