import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCategoryService } from 'src/app/shared/services/menu-category.service';
import { Product } from 'src/app/shared/models/menu-product.model';
import { MenuProductService } from 'src/app/shared/services/menu-product.service';
import { IProduct } from 'src/app/shared/interfaces/menu-product.interface';
import { IMenuCategory } from 'src/app/shared/interfaces/meny-category.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-menu-product',
  templateUrl: './admin-menu-product.component.html',
  styleUrls: ['./admin-menu-product.component.scss']
})

export class AdminMenuProductComponent implements OnInit {
  uploadProgress: Observable<number>;
  productID = 1;
  productCategory: IMenuCategory;
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  productImage: string;
  categoriesArr: Array<IMenuCategory> = [];
  adminProducts: Array<IProduct> = [];
  imageStatus: boolean;
  editStatus: boolean;
  adminProductsSorted: Array<IProduct> = [];
  categoryName: string;
  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  searchName: string;

  constructor(
    public prodService: MenuProductService,
    private catService: MenuCategoryService,
    private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private orderPipe: OrderPipe,
  ) {
    this.adminProductsSorted = orderPipe.transform(this.adminProducts, 'name');
  }

  order: string = 'name';
  reverse: boolean = false;

  setOrders(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  ngOnInit(): void {
    this.getMenuCategoryFireCloud();
    this.getMenuProductFireCloud();
  }

  private getMenuCategoryFireCloud(): void {
    this.catService.getFireCloudMenuCategory().subscribe(
      colection => {
        this.categoriesArr = colection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as IMenuCategory;
          return { id, ...data };
        })
      }
    )
  }

  private getMenuProductFireCloud(): void {
    this.prodService.getFireCloudProduct().subscribe(
      colection => {
        this.adminProducts = colection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as IProduct;
          return { id, ...data }
        })
      }
    )
  }

  setCategory(): void {
    this.productCategory = this.categoriesArr.filter(cat => cat.nameEN === this.categoryName)[0];
  }

  addProductModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  addProduct(): void {
    const newProd = new Product(
      this.productID,
      this.productCategory,
      this.productNameEN,
      this.productNameUA,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage,
    );
    if (!this.editStatus) {
      delete newProd.id;
      this.prodService.postFireCloudProduct({ ...newProd })
        .then(messege => console.log())
        .catch(err => console.log())
    }
    else {
      this.prodService.updateFireCloudProduct({ ...newProd })
        .then(message => console.log())
        .catch(err => console.log());
      this.editStatus = false;
    }
    this.closeModal();
  }

  editProduct(template: TemplateRef<any>, prod: IProduct): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    this.productID = prod.id;
    this.productCategory = this.categoriesArr.filter(categ => categ.nameEN === prod.category.nameEN)[0];
    this.categoryName = this.productCategory.nameEN;
    this.productNameEN = prod.nameEN;
    this.productNameUA = prod.nameUA;
    this.productDescription = prod.description;
    this.productWeight = prod.weight;
    this.productPrice = prod.priceMenu;
    this.productImage = prod.image;
    this.imageStatus = true;
    this.editStatus = true;
  }

  uploadFile(event): void {
    const file = event.target.files[0]
    const type = file.type.slice(file.type.indexOf('/') + 1)
    const name = file.name.slice(0, file.name.lastIndexOf('.'))
    const filePath = `images/menu-product/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/menu-product/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.imageStatus = true;
      })
    })
  }

  closeModal(): void {
    this.modalRef.hide();
    this.resertFormGame();
  }

  private resertFormGame(): void {
    this.productCategory = this.categoriesArr[0];
    this.productNameEN = "";
    this.productNameUA = "";
    this.productDescription = "";
    this.productWeight = "";
    this.productPrice = null;
    this.imageStatus = false;
    this.editStatus = false;
  }

  deleteProduct(product: IProduct): void {
    this.afStorage.storage.refFromURL(this.productImage).delete();
    this.prodService.deleteFireCloudProduct(product.id.toString())
      .then(message => console.log(message))
      .catch(err => console.log(err));

  }

  // deleteOrder(order: any): void {
  //   if (order.statusOrder == 'Виконано' || order.statusOrder == 'Скасовано') {
  //     this.adminService.deleteFireCloudOrder(order.id.toString())
  //       .then(messege => console.log(messege))
  //       .catch(err => console.log(err));
  //   }
  // }

}
