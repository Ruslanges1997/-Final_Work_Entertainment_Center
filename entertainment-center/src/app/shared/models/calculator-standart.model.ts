import { IEntertainment } from '../interfaces/entertainment.interface';

import { ICalculatorStandart } from '../interfaces/calculator-standart.interface'


export class CalculatorStandart implements ICalculatorStandart {
    constructor(
        public id: number = 1,
        public time: string,
        public date: string,
        public countPeoples: number,
        public namePeople: string,
        public phone: number,
        public allPrice?: number,
        public entertainmentOrder?: Array<IEntertainment>,
        public countGamePackage?:number,
        public packageName?: string,
        public statusOrder: string = 'в обробці',
        public email?:any,
    ) { }
}