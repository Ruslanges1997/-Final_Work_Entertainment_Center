import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OurTeam } from '../../shared/models/our-team.model';
import { IOurTeam } from '../../shared/interfaces/our-team.interface';
import { OurTeamService } from '../../shared/services/our-team.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-our-team',
  templateUrl: './admin-our-team.component.html',
  styleUrls: ['./admin-our-team.component.scss']
})
export class AdminOurTeamComponent implements OnInit {
  wID = 1;
  wName: string;
  wProfession: string;
  wImage: string;
  editStatus: boolean;
  imageStatus: boolean;
  ourTeamAdmin: Array<OurTeam> = [];
  uploadProgress: Observable<number>;

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private ourTeamService: OurTeamService
  ) { }

  ngOnInit(): void {
    this.getOurTeamFireCloud();
  }

  private getOurTeamFireCloud(): void {
    this.ourTeamService.getFireCloudOurTeam().subscribe(
      colection => {
        this.ourTeamAdmin = colection.map(document => {
          const data = document.payload.doc.data() as IOurTeam;
          const id = document.payload.doc.id;
          return { id, ...data };
        })
      }
    )
  }

  openTeamModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);

  }

  addOrUpdateWorker(): void {
    const newWorker = new OurTeam(this.wID, this.wName, this.wProfession, this.wImage)
    delete newWorker.id;
    if (!this.editStatus) {
      this.ourTeamService.postFireCloudOurTeam({ ...newWorker })
        .then(messege => console.log(messege))
        .catch(err => console.log(err))
      console.log(newWorker)
    } else {
      this.ourTeamService.updateFireCloudTeam({ ...newWorker })
        .then(messege => console.log(messege))
        .catch(err => console.log(err))
        this.editStatus = false;
    }
    this.closeModal();
  }

  editeWorker(template: TemplateRef<any>, worker: IOurTeam): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    this.wID = worker.id
    this.wName = worker.nameWorker
    this.wProfession = worker.professionWorker
    this.wImage = worker.imageWorker
    this.imageStatus = true;
    this.editStatus = true;
  }

  deleteWorker(worker: IOurTeam): void {
    this.ourTeamService.deleteFireCloudTeam(worker.id.toString())
      .then(message => console.log(message))
      .catch(err => console.log(err));
  }

  uploadFile(event): void {
    const file = event.target.files[0]
    const type = file.type.slice(file.type.indexOf('/') + 1)
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/our-team/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    upload.then(image => {
      this.afStorage.ref(`images/our-team/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.wImage = url;
      });
    });
   
  }

  closeModal(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.wName = ""
    this.wProfession = ""
    this.imageStatus = false;
    this.editStatus = false;
    this.modalRef.hide();
  }



}
















