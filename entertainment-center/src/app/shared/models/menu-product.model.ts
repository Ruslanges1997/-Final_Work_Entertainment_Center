
import { IProduct } from '../interfaces/menu-product.interface';
import { IMenuCategory } from '../interfaces/meny-category.interface'

export class Product implements IProduct {
    constructor(
        public id: number,
        public category: IMenuCategory,
        public nameEN: string,
        public nameUA: string,
        public description: string,
        public weight: string,
        public priceMenu: number,
        public image: string,
        public countMenu: number = 1,
        public count: any = 1,
    ) { }
}
