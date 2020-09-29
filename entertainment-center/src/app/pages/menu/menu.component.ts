import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../../shared/interfaces/menu-product.interface';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  productsArr: Array<any> = [];
  category: string;
  constructor(
    private fireCloud: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getFireCloudProducts(categoryName);
      }
    });
  }

  ngOnInit(): void {
  
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
}