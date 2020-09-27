import { Injectable } from '@angular/core';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IEntertainment } from '../interfaces/entertainment.interface';
import { IProduct } from '../interfaces/menu-product.interface';


@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {

  constructor(
    private fireCloud: AngularFirestore,
  ) { }

  getFireCloudEntertainment(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('entertainment').snapshotChanges();
  }
  getFireCloudUser(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('users').snapshotChanges();
  }

  postFireCloudEntertainment(entertainment: IEntertainment): Promise<DocumentReference> {
    return this.fireCloud.collection('entertainment').add(entertainment);
  }

  deleteFireCloudEntertainment(id: string): Promise<void> {
    return this.fireCloud.collection('entertainment').doc(id).delete();
  }

  updateFireCloudEntertainment(game: IEntertainment): Promise<void> {
    return this.fireCloud.collection('entertainment').doc(game.id.toString()).update(game);
  }
}
