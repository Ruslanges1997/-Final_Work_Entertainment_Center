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
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calculator-birhday',
  templateUrl: './calculator-birhday.component.html',
  styleUrls: ['./calculator-birhday.component.scss'],
})

export class CalculatorBirhdayComponent implements OnInit {
  disInput = true;
  value: string;
  productsArr: Array<any> = [];
  entertainmentArr: Array<IEntertainment> = []
  // entertainment: string;
  orderIDB = 1;
  timeB: string;
  dateB: string;
  counterPeopleB: number;
  calculatorArr: Array<ICalculator> = [];
  counterPeople = 2;
  switch: boolean;
  menuActive: boolean;
  gameAcive: boolean;
  namePeopleOrder: string;
  phoneNumber: number;
  category: string;
  modalRef: BsModalRef;
  productOrders: Array<IProduct>;
  entertainmentOrders: Array<IEntertainment>;
  disAddBirFireBtn: boolean;

  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  dateBirhdayArr: string[] = [];

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

  ngOnInit(): void {
    this.getEntertainment();
    // this.getBasket();
    this.getBasketProduct();
    this.getBasketEntertainment();
    // this.activateBtn();
    // this.getTotal();
    this.getFireCloudProducts();
    this.disabledAddBtnFire();
  }
  next(): void {
    this.switch = !this.switch;
    this.menuActive = !this.menuActive;
    // this.getFireCloudProducts();
    this.getFireCloudProducts();
  }
  switchTwo: boolean;

  nextTwo(): void {
    this.switchTwo = !this.switchTwo;
    this.switch = false;
    this.gameAcive = true;
  }

  nextFree(): void {
    this.switch = true;
    this.switchTwo = false;
    this.gameAcive = false;
  }

  // private activateBtn(): void {
  //   if (this.count > 0) {
  //     this.disBtnAdd = false;
  //   }
  // }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateBirhdayArr.splice(0, 1, `${type}: ${event.value}`);
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
        // this.category = this.productsArr[0].category.nameUA;
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
    this.timeB = value;
    this.modalRef.hide();
  }

  openModalTime(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  disBtnCounPeople: boolean = false;
  countPeople(status: boolean): void {
    if (status && this.counterPeople <= 13) {
      if (this.counterPeople == 13) {
        this.disBtnCounPeople = true;
      }
      this.counterPeople++;
    }
    else {
      if (this.counterPeople > 2) {
        this.counterPeople--;
        this.disBtnCounPeople = false;
      }
    }
    this.counterPeopleB = this.counterPeople;
  }

  totalPriceProd = 0;
  private getTotalProduct(): void {
    const localProdMenu = JSON.parse(localStorage.getItem('myOrder'))
    this.totalPriceProd = localProdMenu.reduce((total, menu) => total + (menu.priceMenu * menu.count), 0);
    this.totalAll();
  }

  totalPriceEntertainment = 0;
  private getTotalEntertainment(): void {
    const localProdGame = JSON.parse(localStorage.getItem('myEntertainment'))
    this.totalPriceEntertainment = localProdGame.reduce((total, game) => total + (game.priceGame * game.count), 0);
    this.totalAll();
  }

  totalAllPrice = 0;
  private totalAll(): void {
    this.totalAllPrice = this.totalPriceProd + (this.totalPriceEntertainment * this.counterPeople)
  }

  private getBasketProduct(): void {
    if (localStorage.getItem('myOrder')) {
      this.productOrders = JSON.parse(localStorage.getItem('myOrder'));
      this.getTotalProduct();
      console.log(this.productOrders)
      // this.updateBasket();
    }
  }

  private getBasketEntertainment(): void {
    if (localStorage.getItem('myEntertainment')) {
      this.entertainmentOrders = JSON.parse(localStorage.getItem('myEntertainment'));
      this.getTotalEntertainment();
      console.log(this.entertainmentOrders);
      // this.updateBasket();
    }
  }

  disBtnAdd = false;
  addToBasketProduct(product: any): void {
    if (product.count != 0) {
      this.calculatorService.addBasketProd(product);
      this.getBasketProduct();
      product.count = 1;
      this.disabledAddBtnFire();

    }
  }

  addToBasketEntertaiment(game: any): void {
    if (game.count != 0) {
      this.calculatorService.addBasketGame(game);
      game.count = 1;
      this.disabledAddBtnFire();
      this.getBasketEntertainment();
    }
  }
  // private updateBasket(): void {
  //   localStorage.setItem('myEntertainment', JSON.stringify(this.entertainmentOrders));
  //   localStorage.setItem('myOrder', JSON.stringify(this.productOrders));
  //   this.getTotalEntertainment();
  //   this.getTotalProduct();
  //   this.calculatorService.basket.next('update');
  // }

  private updateBasketGame(): void {
    localStorage.setItem('myEntertainment', JSON.stringify(this.entertainmentOrders));
    this.getTotalEntertainment();
    this.calculatorService.basket.next('update');
    this.disabledAddBtnFire();
  }

  private updateBasketProd(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.productOrders));
    this.getTotalProduct();
    this.calculatorService.basket.next('update');
    this.disabledAddBtnFire();
  }

  // detectChangeCount(status: boolean): void {
  //   if (status) {
  //     console.log(status)
  //     // this.updateBasket();
  //     this.updateBasketProd();
  //     this.updateBasketGame();
  //   }
  // }
  detectChangeProd(status: boolean): void {
    if (status) {
      this.updateBasketProd();
    }
  }

  detectChangeGame(status: boolean): void {
    if (status) {
      this.updateBasketGame();
    }
  }

  deleteProductGame(game: any): void {
    if (confirm('Are you sure')) {
      const index = this.entertainmentOrders.findIndex(prod => prod.id === game.id);
      this.entertainmentOrders.splice(index, 1);
      // this.updateBasket();
      this.disabledAddBtnFire();
      this.updateBasketGame();
    }
    if (this.entertainmentOrders.length <= 0) {
      localStorage.removeItem('myEntertainment');
      // this.updateBasketGame();
    }
  }

  deleteProductMenu(menu: any): void {
    if (confirm('Are you sure')) {
      const index = this.productOrders.findIndex(prod => prod.id === menu.id);
      this.productOrders.splice(index, 1);
      this.updateBasketProd();
      this.disabledAddBtnFire();
    }
    if (this.productOrders.length <= 0) {
      localStorage.removeItem('myOrder');
      // this.updateBasketProd();
    }
  }

  private disabledAddBtnFire(): void {
    // console.log(this.totalPriceEntertainment, "game") //повертає нуль потрібно доробити
    // console.log(this.totalPriceProd, "menu")
    if (this.totalPriceEntertainment == 0 || this.totalPriceProd == 0) {
      this.disAddBirFireBtn = true;
    } else if (this.totalPriceEntertainment !== 0 || this.totalPriceProd !== 0) {
      this.disAddBirFireBtn = false;
    }
  }

  packageName = "Пакет Склади сам"
  addBirthdayFire(): void {
    const order = new Calculator(
      this.orderIDB,
      this.timeB,
      this.dateB,
      this.counterPeopleB,
      this.namePeopleOrder,
      this.phoneNumber,
      this.totalPriceEntertainment,
      this.totalPriceProd,
      this.totalAllPrice,
      this.productOrders,
      this.entertainmentOrders,
      this.packageName,
    );
    delete order.id;
    console.log(order)
    this.calculatorService.postFireCloudOrder({ ...order })
      .then(() => this.resetOrder())
      .catch(err => console.log(err));
  }

  private resetOrder(): void {
    this.getBasketProduct();
    this.getBasketEntertainment();
    localStorage.removeItem('myOrder');
    localStorage.removeItem('myEntertainment');
    this.productOrders = [];
    this.entertainmentOrders = [];
    this.totalPriceProd = 0;
    this.totalPriceEntertainment = 0;
    this.disBtnCounPeople = false;
    this.totalAllPrice = 0;
    this.counterPeople = 2;
    this.namePeopleOrder = "";
    this.phoneNumber = null;
    this.timeB = '';
    this.dateBirhdayArr = [];
    this.calculatorService.basket.next('Оформили замовлення');
    this.disAddBirFireBtn = true;
  }
}

