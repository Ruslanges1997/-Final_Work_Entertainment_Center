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
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     const categoryName = this.actRoute.snapshot.paramMap.get('category');
    //     this.getFireCloudProducts(categoryName);
    //   }
    // });
  }

  ngOnInit(): void {
    this.getEntertainment();
    this.getFireCloudProducts();
    this.totalPremium();
    this.getEmeilUser();
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
  totalPricePremium: number;
  pricePremiumPackage = 600;

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
  productsArr: Array<IProduct> = [];
  private getFireCloudProducts(): void {
    this.menuProductService.getFireCloudProduct().subscribe(data => {
      this.productsArr = data.map(document => {
        const data = document.payload.doc.data() as IProduct;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
      // console.log(this.productsArr)

      this.getPizaa();

      // console.log(this.productsArr.filter())
    })
  }

  prodPizzaArr: Array<any> = [];
  prodJuiceArr: Array<any> = []
  private getPizaa(): void {
    this.prodPizzaArr = this.productsArr.filter(name => name.nameUA == "Лазер-піца");
    this.prodJuiceArr = this.productsArr.filter(name => name.nameUA == "Яблучний сік");
  }

  counterJuice = this.counterPeople;
  counterJuiceFinal = 1;
  private countJuice(): void {
    // this.counterJuice = this.counterPeople
    this.counterJuiceFinal = Math.floor(this.counterPeople / this.counterJuice + 0.5)
    // console.log(this.counterJuiceFinal)
  }


  // private getFireCloudProducts(categoryName: string = 'pizza'): void {
  //   // this.productsArr = [];
  //   this.fireCloud.collection('menu-product').ref.where('category.nameEN', '==', categoryName).onSnapshot(
  //     collection => {
  //       collection.forEach(document => {
  //         const data = document.data();
  //         const id = document.id;
  //         this.productsArr.push({ id, ...data });
  //       });
  //       // this.category = this.productsArr[0].category.nameUA;
  //     }
  //   );
  // }


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
      this.countJuice();
      this.totalPremium();
    }
    else {
      if (this.counterPeople > 2) {
        this.counterPeople--;
        this.disBtnCounPeople = false;
        this.countJuice();
        this.totalPremium();
      }
    }
    // this.counterJuice = this.counterPeople
    this.counterPeopleB = this.counterPeople;
  }
  setValue(value: string) {
    this.timeB = value;
    this.modalRef.hide();
  }
  closeModal(): void {
    this.modalRef.hide();
  }
  packageName = "Преміум"
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

  statusOrder = 'в обробці'
  addBirthdayPremiumFire(): void {
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
      this.packageName,
      this.counterJuiceFinal,
      this.statusOrder,
      this.userEmail
    );
    localStorage.setItem('myProfile', JSON.stringify(order));
    delete order.id;
    // console.log(order)
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
