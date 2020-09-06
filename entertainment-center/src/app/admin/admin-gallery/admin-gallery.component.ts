import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Gallery } from '../../shared/models/gallary.model';
import { GalleryService } from '../../shared/services/gallery.service';
import { IGallery } from 'src/app/shared/interfaces/gallary.interface';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit {
  // imageArr: any
  imageName: string;
  imageStatus: boolean;
  galleryID = 1;
  galleryImage: string;
  // imageArr:

  imageArr: Array<IGallery> = [];
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
  ) { }

  ngOnInit(): void {
    this.getGalleryFireCloud();
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
    // console.log(this.imageArr)
  }

  openModalAdd(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  closeModal(): void {

  }
  addImage(): void {
    const newImage = new Gallery(this.galleryID,
      this.imageName,
      this.galleryImage,


    );

    delete newImage.id;
    this.galleryService.postFireImage({ ...newImage })
      .then(messege => console.log(messege))
      .catch(err => console.log(err))

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
        console.log(image.metadata.name)
      })
    })

  }

}
