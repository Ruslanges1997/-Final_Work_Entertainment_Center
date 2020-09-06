import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEntertainment } from 'src/app/shared/interfaces/entertainment.interface';
import { EntertainmentService } from 'src/app/shared/services/entertainment.service';
import { IProduct } from '../../shared/interfaces/menu-product.interface';
import { Calculator } from 'src/app/shared/models/calculator-birhtday.model';
import { ICalculator } from '../../shared/interfaces/calculator-birthday.interface';


@Component({
  selector: 'app-calculator-birhday',
  templateUrl: './calculator-birhday.component.html',
  styleUrls: ['./calculator-birhday.component.scss']
})
export class CalculatorBirhdayComponent implements OnInit {
  disInput = true;

  value: string;
  productsArr: Array<any> = [];
  // categorys: string;

  entertainmentArr: Array<IEntertainment> = []
  entertainment: string

  constructor(
    private modalService: BsModalService,
    private fireCloud: AngularFirestore,
    // private prodServis: MenuProductService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private entertainmentService: EntertainmentService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        // this.getProducts(categoryName);
        this.getFireCloudProducts(categoryName);
      }
    });

  }

  ngOnInit(): void {
    this.getEntertainment();
    // this.getFireCloudProducts()
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
        // this.categorys = this.productsArr[0].category.nameUA;

        console.log(this.productsArr)
        // console.log(this.categorys )
      }
    );

  }

  getEntertainment(): void {
    this.entertainmentService.getFireCloudEntertainment().subscribe(data => {
      this.entertainmentArr = data.map(document => {
        const data = document.payload.doc.data() as IEntertainment;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
    })
  }



  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  setValue(value: string) {
    this.value = value;
    console.log(value)
    this.modalRef.hide();
  }


  openModalTime(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  counterPeople = 2;
  countPeople(status: boolean): void {
    if (status && this.counterPeople <= 14) {
      this.counterPeople++;
    }
    else {
      if (this.counterPeople > 2) {
        this.counterPeople--;
      }
    }
    console.log(this.counterPeople)
  }
  cId = 1
  cProduct: Array<IProduct>;
  cPrice: any
  cCountPeople: any

  calculatorArr: Array<ICalculator> = [];

  // orderBirthday(product: IProduct): void {
  //   console.log(product)
  // }

  orderBirthday(): void {

  }

}






// product: any;
  // count = 0;
  // countProduct(status: boolean): void {
  //   if (status) {
  //     this.counter++;
  //   }
  //   else {
  //     if (this.counter > 0) {
  //       this.counter--;
  //     }
  //   }
  //   console.log(this.counter)
  // }


  // counterGame = 0;
  // countGames(status: boolean): void {
  //   if (status) {
  //     this.counterGame++;
  //   }
  //   else {
  //     if (this.counterGame > 1) {
  //       this.counterGame--;
  //     }
  //   }
  //   console.log(this.counterGame)
  // }
