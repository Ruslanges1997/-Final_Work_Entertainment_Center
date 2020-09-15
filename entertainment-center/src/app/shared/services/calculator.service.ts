import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICalculator } from '../interfaces/calculator-birthday.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(
    private fireCloud: AngularFirestore,
  ) { }

  addBasket(product: any): void {
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
    console.log(product, product.count)
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    // localStorage.setItem('myOrder', JSON.stringify(this.calculatorArr));
    // this.getBasket()
    // console.log(localProducts)

  }

  postFireCloudOrder(order: ICalculator): Promise<DocumentReference> {
    return this.fireCloud.collection('orders').add(order);
  }

  getFireCloudOrder(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('orders').snapshotChanges();
  }


}
