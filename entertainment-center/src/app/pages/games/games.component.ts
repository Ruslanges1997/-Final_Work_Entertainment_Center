import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EntertainmentService } from '../../shared/services/entertainment.service';
import { IEntertainment } from '../../shared/interfaces/entertainment.interface';
// import { NavigationEnd, Router,Event, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent implements OnInit {
  entertainmentArr: Array<IEntertainment> = []
  entertainment: string
  constructor(
    // private fireCloud: AngularFirestore,
    private entertainmentService: EntertainmentService
  ) { }

  ngOnInit(): void {
    this.getEntertainment();

  }

  getEntertainment(): void {
    this.entertainmentService.getFireCloudEntertainment().subscribe(data => {
      this.entertainmentArr = data.map(document => {
        const data = document.payload.doc.data() as IEntertainment;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
    })
  }
}
