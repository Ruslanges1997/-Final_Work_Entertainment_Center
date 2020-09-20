
import { IEntertainment } from './entertainment.interface';



export interface ICalculatorStandart {
    id: number ;
    time: string;
    date: string;
    countPeoples: number;
    namePeople: string,
    phone: number;
    priceStandart?: number;
    entertainmentOrder?: Array<IEntertainment>;
    packageName?: string ;
}