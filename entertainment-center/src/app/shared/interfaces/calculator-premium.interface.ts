import { IEntertainment } from './entertainment.interface';
import { IProduct } from './menu-product.interface';

export interface ICalculatorPremium {
    id: number;
    time: string;
    date: string;
    countPeoples: number;
    namePeople: string,
    phone: number;
    pricePremium: number;
    entertainmentOrder?: Array<IEntertainment>;
    prodPizza?: Array<IProduct>;
    prodJuice?: Array<IProduct>;
    packageName?: string;
}