import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IMenuCategory } from 'src/app/shared/interfaces/meny-category.interface';
import { MenuCategory } from 'src/app/shared/models/menu-category.models';
import { MenuCategoryService } from 'src/app/shared/services/menu-category.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-category-menu',
  templateUrl: './admin-category-menu.component.html',
  styleUrls: ['./admin-category-menu.component.scss']
})
export class AdminCategoryMenuComponent implements OnInit {

  catID: number;
  catNameEN: string;
  catNameUA: string;
  menuCategoryAdminArr: Array<MenuCategory> = [];
  soretedAdminCategoryMenu: Array<MenuCategory> = [];

  constructor(
    private modalService: BsModalService,
    private catService: MenuCategoryService,
    private orderPipe: OrderPipe,
  ) {
    this.soretedAdminCategoryMenu = orderPipe.transform(this.menuCategoryAdminArr, 'name');
  }

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  searchName:string;
  order: string = 'name';
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  ngOnInit(): void {
    this.getMenuCategoryFireCloud();
  }

  private getMenuCategoryFireCloud(): void {
    this.catService.getFireCloudMenuCategory().subscribe(
      colection => {
        this.menuCategoryAdminArr = colection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as IMenuCategory;
          return { id, ...data };
        })
      }
    )
  }



  openModalAdd(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    // console.log(this.adminCategory)
  }

  addCategory(): void {
    const newCategory = new MenuCategory(this.catID, this.catNameEN, this.catNameUA)
    delete newCategory.id;
    this.catService.postFireCloudMenuCategory({ ...newCategory })
      .then(messege => console.log(messege))
      .catch(err => console.log(err))
    this.closeModal();
  }

  deleteCategoryMenu(category: IMenuCategory): void {
    this.catService.deleteFireCloudMenuCategory(category.id.toString())
      .then(message => console.log(message))
      .catch(err => console.log(err));
  }

  closeModal(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.catNameEN = "";
    this.catNameUA = "";
    this.modalRef.hide();
  }

}
