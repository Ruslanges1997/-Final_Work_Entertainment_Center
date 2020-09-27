import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminBirthdayService } from '../../shared/services/admin-birthday.service';

@Component({
  selector: 'app-admin-birthday',
  templateUrl: './admin-birthday.component.html',
  styleUrls: ['./admin-birthday.component.scss']
})
export class AdminBirthdayComponent implements OnInit {
  constructor(
    private adminService: AdminBirthdayService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  orderAdminArr: any;
  statusOption: string;

  private getOrders(): void {
    this.adminService.getFireCloudOrder().subscribe(
      colection => {
        this.orderAdminArr = colection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as any;
          return { id, ...data };
        })
      }
    )
  }
  currAdmOrder: any
  changeStatus(): void {
    this.currAdmOrder.statusOrder = this.statusOption;
    this.adminService.updateFireCloudOrder(this.currAdmOrder)
      .then(() => {
        this.getOrders();
        if (localStorage.getItem('myProfile')) {
          localStorage.setItem('myProfile', JSON.stringify(this.currAdmOrder));
          // this.emailtOrders = JSON.parse(localStorage.getItem('myProfile'));
          // console.log('єрезультат')
        } else {
          // console.log('немає результату')
        }
      })
      .catch(error => console.log(error))
  }

  editeOrder(template: TemplateRef<any>, order: any): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    this.currAdmOrder = order;
  }

  deleteOrder(order: any): void {
    if (order.statusOrder == 'Виконано' || order.statusOrder == 'Скасовано') {
      // console.log(order.statusOrder)
      this.adminService.deleteFireCloudOrder(order.id.toString())
        .then(() => {
          localStorage.removeItem('myProfile');
        })
        .catch(err => console.log(err));
    }
  }

  closeModal(): void {
    this.modalRef.hide();
  }

}
