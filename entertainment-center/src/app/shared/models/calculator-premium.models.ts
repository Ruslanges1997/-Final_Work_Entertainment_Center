
import { IEntertainment } from '../interfaces/entertainment.interface';
import { ICalculatorPremium } from '../interfaces/calculator-premium.interface'
import { IProduct } from 'src/app/shared/interfaces/menu-product.interface';
export class CalculatorPremium implements ICalculatorPremium {
    constructor(
        public id: number,
        public time: string,
        public date: string,
        public countPeoples: number,
        public namePeople: string,
        public phone: number,
        public allPrice: number,
        public entertainmentOrder?: Array<IEntertainment>,
        public prodPizza?: Array<IProduct>,
        public prodJuice?: Array<IProduct>,
        public countGamePackage?: number,
        public packageName?: string,
        public countPizzaPackage?: number,
        public counterJuice?: number,
        public statusOrder: string = 'в обробці',
        public email?: any,
    ) { }
}