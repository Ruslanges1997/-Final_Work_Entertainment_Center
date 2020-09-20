
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
        public pricePremium: number,
        public entertainmentOrder?: Array<IEntertainment>,
        public prodPizza?: Array<IProduct>,
        public prodJuice?: Array<IProduct>,
        public packageName?: string,
    ) { }
}

