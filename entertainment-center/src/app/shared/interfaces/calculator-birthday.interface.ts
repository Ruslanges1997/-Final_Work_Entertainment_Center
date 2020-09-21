import { IProduct } from './menu-product.interface'
import { IEntertainment } from './entertainment.interface';



export interface ICalculator {
    id: number;
    time: string;
    date: string;
    countPeoples: number;
    namePeople: string;
    phone: number;
    priceGame?: number;
    priceMenu?: number;
    allPrice?: number;
    productOrder?: Array<IProduct>;
    entertainmentOrder?: Array<IEntertainment>;
    packageName?: string;
    statusOrder: string;
}