import { IMenuCategory } from './meny-category.interface';


export interface IProduct {
    id: number;
    category: IMenuCategory;
    nameEN: string;
    nameUA: string;
    description: string;
    weight: string;
    price: number;
    image: string;
    count: number;
}