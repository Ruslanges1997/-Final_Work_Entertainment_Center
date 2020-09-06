import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { MenuProductService } from '../../shared/services/menu-product.service';
import { IProduct } from '../../shared/interfaces/menu-product.interface';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // prodtArr:<Ara>IProduct;
  // prodtArr: Array<IProduct> = []
  // product: any;
  // productsArr: Array<IProduct> = [];
  productsArr: Array<any> = [];
  category: string;
  constructor(
    private fireCloud: AngularFirestore,
    // private prodServis: MenuProductService,
    private actRoute: ActivatedRoute,
    private router: Router,
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
    // this.getViewProduct();
    // this.getEntertainment();
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
        this.category = this.productsArr[0].category.nameUA;
      }
    );
  }
  // private getViewProduct(): void {
  //   const id = this.actRoute.snapshot.paramMap.get('id');
  //   this.fireCloud.collection('menu-product').doc(id).get().subscribe(
  //     document => {
  //       const data = document.data();
  //       console.log(data)
  //       const dataID = document.id;
  //       console.log(dataID)
  //       this.product = { dataID, ...data };
  //     }

  //   );
  // }

  // }
  // getEntertainment(): void {
  //   this.prodServis.getFireCloudProduct().subscribe(data => {
  //     this.prodtArr = data.map(document => {
  //       const data = document.payload.doc.data() as IProduct;
  //       const id = document.payload.doc.id;
  //       return { id, ...data }
  //     })
  //   })
  // }

}