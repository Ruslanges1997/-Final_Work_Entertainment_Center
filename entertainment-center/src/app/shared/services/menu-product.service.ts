import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/menu-product.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuProductService {

  constructor(
    private fireCloud: AngularFirestore,
  ) { }

  getFireCloudProduct(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('menu-product').snapshotChanges();
  }

  postFireCloudProduct(mProduct: IProduct): Promise<DocumentReference> {
    return this.fireCloud.collection('menu-product').add(mProduct)
  }
  
  updateFireCloudProduct(mProduct: IProduct): Promise<void> {
    return this.fireCloud.collection('menu-product').doc(mProduct.id.toString()).update(mProduct);
  }

  deleteFireCloudProduct(id: string): Promise<void> {
    return this.fireCloud.collection('menu-product').doc(id).delete();
  }
}
