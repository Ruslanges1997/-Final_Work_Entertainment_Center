import { IEntertainment } from '../interfaces/entertainment.interface';
import { IProduct } from '../interfaces/menu-product.interface';
import { ICalculator } from '../interfaces/calculator-birthday.interface'


export class Calculator implements ICalculator {
    constructor(
        public id: number = 1,
        public time: string,
        public date: string,
        public countPeoples: number,
        // public calculatorArray: any,
        // public count?: number,
        public namePeople: string,
        public phone: number,
        public priceGame?: number,
        public priceMenu?: number,
        public allPrice?: number,
        public productOrder?: Array<IProduct>,
        public entertainmentOrder?: Array<IEntertainment>,
        public packageName?: string,
        public statusOrder: string = 'в обробці',
    ) { }
}