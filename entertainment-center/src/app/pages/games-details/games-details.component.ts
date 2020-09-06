import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-details',
  templateUrl: './games-details.component.html',
  styleUrls: ['./games-details.component.scss']
})
export class GamesDetailsComponent implements OnInit {
  game: any;

  constructor(
    private fireCloud: AngularFirestore,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getViewGame();
  }


  private getViewGame(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.fireCloud.collection('entertainment').doc(id).get().subscribe(
      document => {
        const data = document.data();
        console.log(data)
        const dataID = document.id;
        console.log(dataID)
        this.game = { dataID, ...data };
      }
    );
  }
}
