import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEntertainment } from 'src/app/shared/interfaces/entertainment.interface';
import { EntertainmentService } from 'src/app/shared/services/entertainment.service';
import { IProduct } from '../../shared/interfaces/menu-product.interface';
import { Calculator } from 'src/app/shared/models/calculator-birhtday.model';
import { ICalculator } from '../../shared/interfaces/calculator-birthday.interface';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CalculatorService } from '../../shared/services/calculator.service';

@Component({
  selector: 'app-calculator-birhday',
  templateUrl: './calculator-birhday.component.html',
  styleUrls: ['./calculator-birhday.component.scss'],
})

export class CalculatorBirhdayComponent implements OnInit {
  disInput = true;
  value: string;
  // valueDate = new Date();
  productsArr: Array<any> = [];
  entertainmentArr: Array<IEntertainment> = []
  entertainment: string;

  orderIDB = 1;
  timeB: string;
  dateB: string;
  counterPeopleB: number;
  calculatorArr: Array<ICalculator> = [];
  totalPrice = 0;
  counterPeople = 2;

  constructor(
    private modalService: BsModalService,
    private fireCloud: AngularFirestore,
    private calculatorService: CalculatorService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private entertainmentService: EntertainmentService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getFireCloudProducts(categoryName);
      }
    });
  }
  switch: boolean;

  next(): void {
    this.switch = !this.switch;
  }
  ngOnInit(): void {
    this.getEntertainment();
    this.getBasket();
    // this.getTotal();
    // this.getFireCloudProducts()
  }

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  dateBirhdayArr: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateBirhdayArr.splice(0, 1, `${type}: ${event.value}`);
    console.log(this.dateBirhdayArr)
  }

  private getFireCloudProducts(categoryName: string = 'pizza'): void {
    this.productsArr = [];
    this.fireCloud.collection('menu-product').ref.where('category.nameEN', '==', categoryName).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data();
          const id = document.id;
          this.productsArr.push({ id, ...data });
        });
      }
    );
  }

  private getEntertainment(): void {
    this.entertainmentService.getFireCloudEntertainment().subscribe(data => {
      this.entertainmentArr = data.map(document => {
        const data = document.payload.doc.data() as IEntertainment;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
    })
  }

  setValue(value: string) {
    // this.value = value;
    this.timeB = value;
    this.modalRef.hide();
  }

  openModalTime(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  countPeople(status: boolean): void {
    if (status && this.counterPeople < 15) {
      this.counterPeople++;
    }
    else {
      if (this.counterPeople > 2) {
        this.counterPeople--;
      }
    }
    this.counterPeopleB = this.counterPeople;
  }

  private getTotal(): void {
    const localProducts = JSON.parse(localStorage.getItem('myOrder'))
    this.totalPrice = localProducts.reduce((total, menu) => total + (menu.priceMenu * menu.count), 0);
    console.log(this.totalPrice)
  }

  private getBasket(): void {
    if (localStorage.getItem('myOrder')) {
      // this.calculatorArr = JSON.parse(localStorage.getItem('myOrder'));
      this.productOrders = JSON.parse(localStorage.getItem('myOrder'));
      this.entertainmentOrders = JSON.parse(localStorage.getItem('myOrder'));
      // console.log(this.calculatorArr)
      // this.getTotal();
      console.log(this.productOrders)
      console.log(this.entertainmentOrders)
    }
  }
  addToBasket(product: any): void {
    this.calculatorService.addBasket(product);
    this.getBasket()
    product.count = 0;
    this.getTotal();
    console.log(this.productOrders,)
    console.log(this.entertainmentOrders,)
  }

  productOrders: Array<IProduct>;
  entertainmentOrders: Array<IEntertainment>;

  addBirthdayFire(): void {
    const order = new Calculator(
      this.orderIDB,
      this.timeB,
      this.dateB,
      this.counterPeopleB,
      // this.calculatorArr
      this.productOrders,
      this.entertainmentOrders,
      // this.calculatorArr
    );
    delete order.id;
    console.log(order)
    this.calculatorService.postFireCloudOrder({ ...order })
      .then(() => this.resetOrder())
      .catch(err => console.log(err));
  }

  private resetOrder(): void {
    // console.log()
    localStorage.removeItem('myOrder');
    this.calculatorArr = [];
    // this.ordersService.basket.next('Оформили замовлення');
  }
}
// https://github.com/Ruslanges1997/-Final_Work_Entertainment_Center.git

