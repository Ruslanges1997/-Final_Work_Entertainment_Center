import { Injectable } from '@angular/core';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEntertainment } from '../interfaces/entertainment.interface';


@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {


  constructor(

    private htpp: HttpClient,
    private fireCloud: AngularFirestore,

  ) { }

  getFireCloudEntertainment(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('entertainment').snapshotChanges();
  }

  postFireCloudEntertainment(entertainment: IEntertainment): Promise<DocumentReference> {
    return this.fireCloud.collection('entertainment').add(entertainment);
  }



  deleteFireCloudEntertainment(id: string): Promise<void> {
    return this.fireCloud.collection('entertainment').doc(id).delete();
  }

  // updateFireCloudEntertainment(discount: IDiscount): Promise<void> {
  //   return this.firecloud.collection('discounts').doc(discount.id.toString()).update(discount);
  // }

}
