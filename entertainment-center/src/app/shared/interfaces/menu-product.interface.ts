import { IMenuCategory } from './meny-category.interface';


export interface IProduct {
    id: number;
    category: IMenuCategory;
    nameEN: string;
    nameUA: string;
    description: string;
    weight: string;
    priceMenu: number;
    image: string;
    countMenu: number;
    count: any;
      // totalPrice?: any;
}