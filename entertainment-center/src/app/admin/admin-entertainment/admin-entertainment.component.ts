import { Component, OnInit, TemplateRef } from '@angular/core';
import { EntertainmentService } from '../../shared/services/entertainment.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { Entertainment } from 'src/app/shared/models/entertainment.model';
import { IEntertainment } from '../../shared/interfaces/entertainment.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin-entertainment',
  templateUrl: './admin-entertainment.component.html',
  styleUrls: ['./admin-entertainment.component.scss']
})

export class AdminEntertainmentComponent implements OnInit {
  // eID = 1;
  // eTitle: string;
  // eText: string;
  // eImage: string;

  eID = 1;
  eNameGame: string;
  eDescriptionGame: string;
  eImageGame: string;
  eTimeGame: string;
  ePriceGame: number;
  currEntertainment: IEntertainment;
  // eImage: string = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';
  adminEntertainment: Array<IEntertainment> = [];
  constructor(
    private entertainmentService: EntertainmentService,
    private afStorage: AngularFireStorage,
    private modalService: BsModalService,
  ) { }

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  addCategoryModal(template: TemplateRef<any>): void { //Відкриває модалку для Входу
    this.modalRef = this.modalService.show(template, this.modalRefconfig);

  }

  ngOnInit(): void {
    // this.getEntertainment();
    this.entertainmentFireCloudCategories();
  }

  private entertainmentFireCloudCategories(): void {
    this.entertainmentService.getFireCloudEntertainment().subscribe(
      collection => {
        this.adminEntertainment = collection.map(document => {
          const data = document.payload.doc.data() as IEntertainment;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }
  // addEntertainment(): void {

  // }
  // private getEntertainment(): void {
  //   this.entertainmentService.getFireCloudEntertainment().subscribe(data => {
  //     this.adminEntertainment = data;
  //   });
  // }
  // addEntertainment(): void {
  //   const newEntertainment = new Entertainment(this.eID, this.eTitle, this.eText, this.eImage);

  //   delete newEntertainment.id;
  //   this.entertainmentService.postFireCloudEntertainment({ ...newEntertainment })
  //     .then(message => console.log(message))
  //     .catch(err => console.log(err));

  //   console.log(newEntertainment)
  // }

  addEntertainment(): void {
    const newEntertainment = new Entertainment(this.eID,this.eImageGame, this.eNameGame, this.eDescriptionGame, this.eTimeGame, this.ePriceGame);
    delete newEntertainment.id;
    this.entertainmentService.postFireCloudEntertainment({ ...newEntertainment })
      .then(message => console.log(message))
      .catch(err => console.log(err));

    console.log(newEntertainment)
  }


  uploadFile(event): void {
    const file = event.target.files[0]
    console.log(file)
    const type = file.type.slice(file.type.indexOf('/') + 1)
    console.log(type)
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    console.log(name)
    const filePath = `images/entertainment/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    upload.then(image => {
      this.afStorage.ref(`images/entertainment/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.eImageGame = url;
      });
    });
  }




  deleteEntertainment(e: IEntertainment): void {

    this.entertainmentService.deleteFireCloudEntertainment(e.id.toString())
      .then(message => console.log(message))
      .catch(err => console.log(err));
  }





}
