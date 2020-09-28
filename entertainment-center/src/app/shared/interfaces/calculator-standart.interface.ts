import { IEntertainment } from './entertainment.interface';

export interface ICalculatorStandart {
    id: number;
    time: string;
    date: string;
    countPeoples: number;
    namePeople: string,
    phone: number;
    allPrice?: number;
    entertainmentOrder?: Array<IEntertainment>;
    countGamePackage?: number;
    packageName?: string;
    statusOrder: string;
    email?: any;
}