import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEntertainment } from '../../shared/interfaces/entertainment.interface';
import { EntertainmentService } from '../../shared/services/entertainment.service';
import { IProduct } from 'src/app/shared/interfaces/menu-product.interface';
import { MenuProductService } from '../../shared/services/menu-product.service';
import { CalculatorService } from '../../shared/services/calculator.service';
import { CalculatorPremium } from 'src/app/shared/models/calculator-premium.models';

@Component({
  selector: 'app-calculator-premium',
  templateUrl: './calculator-premium.component.html',
  styleUrls: ['./calculator-premium.component.scss']
})
export class CalculatorPremiumComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private entertainmentService: EntertainmentService,
    private fireCloud: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router: Router,
    private menuProductService: MenuProductService,
    private calculatorService: CalculatorService,
  ) {
  }
  ngOnInit(): void {
    this.getEntertainment();
    this.getFireCloudProducts();
    this.totalPremium();
    this.getEmeilUser();
  }

  dateBirhdayArr: string[] = [];
  phoneNumber: number;
  namePeopleOrder: string;
  entertainmentAray: Array<IEntertainment> = []
  entertainment: string;
  orderIDB = 1;
  timeB: string;
  dateB: string;
  counterPeopleB: number;
  totalPriceProd = 0;
  counterPeople = 2;
  totalPricePremium: number;
  pricePremiumPackage = 600;
  prodPizzaArr: Array<any> = [];
  prodJuiceArr: Array<any> = []
  productsArr: Array<IProduct> = [];
  emailtOrders: any;
  packageName = "Преміум"
  userEmail = "admin";
  statusOrder = 'в обробці'
  countGamePackage = 3;
  countPizzaPackage: number;
  disBtnCounPeople: boolean = false;
  counterJuice = this.counterPeople;
  counterJuiceFinal = 1;
  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  private totalPremium(): void {
    this.totalPricePremium = this.pricePremiumPackage * this.counterPeople
  }
  private getEntertainment(): void {
    this.entertainmentService.getFireCloudEntertainment().subscribe(data => {
      this.entertainmentAray = data.map(document => {
        const data = document.payload.doc.data() as IEntertainment;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
    })
  }

  private getFireCloudProducts(): void {
    this.menuProductService.getFireCloudProduct().subscribe(data => {
      this.productsArr = data.map(document => {
        const data = document.payload.doc.data() as IProduct;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
      this.getPizaa();
    })
  }


  private getPizaa(): void {
    this.prodPizzaArr = this.productsArr.filter(name => name.nameUA == "Лазер-піца");
    this.prodJuiceArr = this.productsArr.filter(name => name.nameUA == "Яблучний сік");
  }

  private countJuice(): void {
    this.counterJuiceFinal = Math.floor(this.counterPeople / this.counterJuice + 0.5)
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
      this.countPizzaPackage = this.counterPeople;
      this.countJuice();
      this.totalPremium();
    }
    else {
      if (this.counterPeople > 2) {
        this.counterPeople--;
        this.countPizzaPackage = this.counterPeople;
        this.disBtnCounPeople = false;
        this.countJuice();
        this.totalPremium();
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


  private getEmeilUser() {
    if (localStorage.getItem('user')) {
      this.emailtOrders = JSON.parse(localStorage.getItem('user'));
      this.userEmail = this.emailtOrders.userEmail
      this.namePeopleOrder = this.emailtOrders.userFirstName
    } else {
      this.namePeopleOrder = "";
    }
  }

  private getStatusPriofile(): void {
    this.getEmeilUser();
    if (this.userEmail == 'admin') {
      this.router.navigateByUrl('/order-birthday');
    }
    else if (this.userEmail !== 'admin') {
      this.router.navigateByUrl('/profile');
    }
  }

  addBirthdayPremiumFire(): void {
    this.getStatusPriofile();
    const order = new CalculatorPremium(
      this.orderIDB,
      this.timeB,
      this.dateB.toString(),
      this.counterPeopleB,
      this.namePeopleOrder,
      this.phoneNumber,
      this.totalPricePremium,
      this.entertainmentAray,
      this.prodPizzaArr,
      this.prodJuiceArr,
      this.countGamePackage,
      this.packageName,
      this.countPizzaPackage,
      this.counterJuiceFinal,
      this.statusOrder,
      this.userEmail
    );
    delete order.id;
    this.calculatorService.postFireCloudOrderPremium({ ...order })
      .then(() => this.resetOrder())
      .catch(err => console.log(err));
  }

  resetOrder(): void {
    this.counterPeople = 2;
    this.totalPremium();
    this.prodPizzaArr = [];
    this.prodJuiceArr = [];
    this.dateBirhdayArr = [];
    this.phoneNumber = null;
    this.namePeopleOrder = "";
    this.timeB = '';
  }
}
