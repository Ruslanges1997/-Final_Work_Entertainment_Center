import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ICalculator } from '../interfaces/calculator-birthday.interface';
import { Entertainment } from '../models/entertainment.model';
import { IProduct } from '../interfaces/menu-product.interface';
import { IEntertainment } from '../interfaces/entertainment.interface';
import { ICalculatorPremium } from '../interfaces/calculator-premium.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  basket: Subject<any> = new Subject<any>();
  constructor(
    private fireCloud: AngularFirestore,
  ) { }

  addBasketProd(product: any): void {
    let localProducts: Array<any> = [];
    if (localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    this.basket.next('Хто щось добавив в кошик');
  }

  addBasketGame(game: IEntertainment): void {
    let localEntertainment: Array<IEntertainment> = [];
    if (localStorage.getItem('myEntertainment')) {
      localEntertainment = JSON.parse(localStorage.getItem('myEntertainment'));
      if (localEntertainment.some(entertainment => entertainment.id === game.id)) {
        const index = localEntertainment.findIndex(prod => prod.id === game.id);
        localEntertainment[index].count += game.count;
      }
      else {
        localEntertainment.push(game);
      }
    }
    else {
      localEntertainment.push(game);
    }
    localStorage.setItem('myEntertainment', JSON.stringify(localEntertainment));
    this.basket.next('Хто щось добавив в кошик');
  }

  postFireCloudOrder(order: ICalculator): Promise<DocumentReference> {
    return this.fireCloud.collection('orders').add(order);
  }
  postFireCloudOrderPremium(order: ICalculatorPremium): Promise<DocumentReference> {
    return this.fireCloud.collection('orders').add(order);
  }

  getFireCloudOrder(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('orders').snapshotChanges();
  }

}
