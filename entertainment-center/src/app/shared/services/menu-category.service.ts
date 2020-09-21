import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { IMenuCategory } from '../interfaces/meny-category.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MenuCategoryService {

  constructor(
    private fireCloud: AngularFirestore,
  ) { }

  getFireCloudMenuCategory(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('menu-category').snapshotChanges();
  }

  postFireCloudMenuCategory(mCategory: IMenuCategory): Promise<DocumentReference> {
    return this.fireCloud.collection('menu-category').add(mCategory);
  }

  deleteFireCloudMenuCategory(id: string): Promise<void> {
    return this.fireCloud.collection('menu-category').doc(id).delete();
  }
  
}

