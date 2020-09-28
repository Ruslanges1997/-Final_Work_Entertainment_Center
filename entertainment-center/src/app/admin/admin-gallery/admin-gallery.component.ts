import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Gallery } from '../../shared/models/gallary.model';
import { GalleryService } from '../../shared/services/gallery.service';
import { IGallery } from 'src/app/shared/interfaces/gallary.interface';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit {
  imageName: string;
  imageStatus: boolean;
  galleryID = 1;
  galleryImage: string;
  searchName: string;
  imageArr: Array<IGallery> = [];
  imageArrSorted: Array<IGallery> = [];
  uploadProgress: Observable<number>;
  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private galleryService: GalleryService,
    private orderPipe: OrderPipe,
  ) {
    this.imageArrSorted = orderPipe.transform(this.imageArr, 'name')
  }

  ngOnInit(): void {
    this.getGalleryFireCloud();
  }

  order: string = 'name';
  reverse: boolean = false;

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  private getGalleryFireCloud(): void {
    this.galleryService.getFireCloudImage().subscribe(
      colection => {
        this.imageArr = colection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as IGallery;
          return { id, ...data }
        })
      }
    )
  }

  openModalAdd(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  closeModal(): void {
    this.imageName = "";
    this.imageStatus = false;
    this.modalRef.hide();
  }

  addImage(): void {
    const newImage = new Gallery(this.galleryID,
      this.galleryImage,
      this.imageName,
    );
    delete newImage.id;
    this.galleryService.postFireImage({ ...newImage })
      .then(messege => console.log(messege))
      .catch(err => console.log(err))

    this.closeModal();
  }

  uploadFile(event): void {
    const file = event.target.files[0]
    const type = file.type.slice(file.type.indexOf('/') + 1)
    const name = file.name.slice(0, file.name.lastIndexOf('.'))
    const filePath = `images/gallery/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/gallery/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.galleryImage = url;
        this.imageStatus = true;
      })
    })
  }

  private deletImageStorefe(): void {
    this.afStorage.storage.refFromURL(this.galleryImage).delete();
  }

  deleteImage(image: IGallery): void {
    this.deletImageStorefe();
    this.galleryService.deleteFireCloudImage(image.id.toString())
      .then(message => console.log(message))

      .catch(err => console.log(err));
  }
}
