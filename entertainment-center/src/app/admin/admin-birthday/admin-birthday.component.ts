import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';
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
    private orderPipe: OrderPipe,
  ) {
    this.soretedAdminOrder = orderPipe.transform(this.orderAdminArr, 'name');
  }

  soretedAdminOrder
  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  orderAdminArr: any;
  statusOption: string;
  currAdmOrder: any;
  order: string = 'name';
  reverse: boolean = false;

  ngOnInit(): void {
    this.getOrders();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

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

  changeStatus(): void {
    this.currAdmOrder.statusOrder = this.statusOption;
    this.adminService.updateFireCloudOrder(this.currAdmOrder)
      .then(() => {
        this.getOrders();
      })
      .catch(error => console.log(error))
  }

  editeOrder(template: TemplateRef<any>, order: any): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    this.currAdmOrder = order;
  }

  deleteOrder(order: any): void {
    if (order.statusOrder == 'Виконано' || order.statusOrder == 'Скасовано') {
      this.adminService.deleteFireCloudOrder(order.id.toString())
        .then(messege => console.log(messege))
        .catch (err => console.log(err));
    }
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}
