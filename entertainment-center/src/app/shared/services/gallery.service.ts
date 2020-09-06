import { Injectable } from '@angular/core';
import { IGallery } from '../interfaces/gallary.interface';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private fireCloud: AngularFirestore,
  ) { }

  postFireImage(gImage: IGallery): Promise<DocumentReference> {
    return this.fireCloud.collection('gallery').add(gImage)
  }

  getFireCloudImage(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('gallery').snapshotChanges();
  }

}
