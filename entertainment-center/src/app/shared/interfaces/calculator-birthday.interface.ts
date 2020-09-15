import { IProduct } from './menu-product.interface'
import { IEntertainment } from './entertainment.interface';



export interface ICalculator {
    id: number;
    time: string;
    date: string;
    countPeoples: number;
    // calculatorArray: any;
    // count?: number;
    productOrder?: Array<IProduct>;
    entertainmentOrder?: Array<IEntertainment>;

}