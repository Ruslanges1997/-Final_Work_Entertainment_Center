import { Component, OnInit, TemplateRef } from '@angular/core';
import { EntertainmentService } from '../../shared/services/entertainment.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { Entertainment } from 'src/app/shared/models/entertainment.model';
import { IEntertainment } from '../../shared/interfaces/entertainment.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IOurTeam } from '../../shared/interfaces/our-team.interface';
import { Observable, } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-entertainment',
  templateUrl: './admin-entertainment.component.html',
  styleUrls: ['./admin-entertainment.component.scss']
})

export class AdminEntertainmentComponent implements OnInit {
  eID = 1;
  eNameGame: string;
  eDescriptionGame: string;
  eImageGame: string;
  eTimeGame: string;
  ePriceGame: number;
  uploadProgress: Observable<number>;
  editStatus: boolean;
  imageStatus: boolean;
  searchName:string;
  soretedAdminEntertainment: Array<IEntertainment> = [];
  adminEntertainment: Array<IEntertainment> = [];
  constructor(
    private entertainmentService: EntertainmentService,
    private afStorage: AngularFireStorage,
    private modalService: BsModalService,
    private orderPipe: OrderPipe,
  ) {
    this.soretedAdminEntertainment = orderPipe.transform(this.adminEntertainment, 'name');
  }

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  order: string = 'name';
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  openGameModals(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  ngOnInit(): void {
    this.getEntertainmentFireCloud();
  }

  private getEntertainmentFireCloud(): void {
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

  addOrUpdateEntertainment(): void {
    const newEntertainment = new Entertainment(this.eID,
      this.eImageGame,
      this.eNameGame,
      this.eDescriptionGame,
      this.eTimeGame,
      this.ePriceGame);
    if (!this.editStatus) {
      delete newEntertainment.id;
      this.entertainmentService.postFireCloudEntertainment({ ...newEntertainment })
        .then(message => console.log(message))
        .catch(err => console.log(err));
    } 
    else {
      this.entertainmentService.updateFireCloudEntertainment({ ...newEntertainment })
        .then(message => console.log(message))
        .catch(err => console.log(err));
      this.editStatus = false;
    }
    this.closeModal();
  }

  uploadFile(event): void {
    const file = event.target.files[0]
    const type = file.type.slice(file.type.indexOf('/') + 1)
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/entertainment/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/entertainment/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.eImageGame = url;
        this.imageStatus = true;
      });
    });
  }

  deleteEntertainment(game: IEntertainment): void {
    this.afStorage.storage.refFromURL(this.eImageGame).delete();
    this.entertainmentService.deleteFireCloudEntertainment(game.id.toString())
      .then(message => console.log(message))
      .catch(err => console.log(err));
  }

  editeEntertaiment(template: TemplateRef<any>, game: IEntertainment): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    this.eID = game.id
    this.eImageGame = game.imageGame
    this.eNameGame = game.nameGame
    this.eDescriptionGame = game.descriptionGame
    this.eTimeGame = game.timeGame
    this.ePriceGame = game.priceGame
    this.imageStatus = true;
    this.editStatus = true;
  }

  closeModal(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.eNameGame = "";
    this.eDescriptionGame = "";
    this.eTimeGame = "";
    this.ePriceGame = null;
    this.imageStatus = false;
    this.editStatus = false;
    this.modalRef.hide();
  }
}
