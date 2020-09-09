import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IOurTeam } from '../interfaces/our-team.interface';

@Injectable({
  providedIn: 'root'
})
export class OurTeamService {

  constructor(
    private fireCloud: AngularFirestore,
  ) { }


  getFireCloudOurTeam(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireCloud.collection('our-team').snapshotChanges();
  }

  postFireCloudOurTeam(worker: IOurTeam): Promise<DocumentReference> {
    return this.fireCloud.collection('our-team').add(worker);
  }

  deleteFireCloudTeam(id: string): Promise<void> {
    return this.fireCloud.collection('our-team').doc(id).delete();
  }


  updateFireCloudTeam(worker: IOurTeam): Promise<void> {
    return this.fireCloud.collection('our-team').doc(worker.id.toString()).update(worker);
  }
  
}
