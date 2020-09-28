import { Injectable } from '@angular/core';
import { DocumentChangeAction, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminBirthdayService {
  constructor(
    private fireCloud: AngularFirestore,
  ) { }

  getFireCloudOrder(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('orders').snapshotChanges();
  }

  updateFireCloudOrder(order: any): Promise<void> {
    return this.fireCloud.collection('orders').doc(order.id.toString()).update(order);
  }

  deleteFireCloudOrder(id: string): Promise<any> {
    return this.fireCloud.collection('orders').doc(id).delete();
  }
}
