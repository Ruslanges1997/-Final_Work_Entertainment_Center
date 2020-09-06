
import { IProduct } from '../interfaces/menu-product.interface';
import { ICalculator } from '../interfaces/calculator-birthday.interface'


export class Calculator implements ICalculator {
    constructor(
        public id: number,
        public   productOrder: Array<IProduct>,
        // namePeople: string;
        // public price?: number,
        // public countPeople: number = 1,
        // public description: string,
        // public weight: string,
        // public price: number,
        // public image: string,
        // public count: number = 1
    ) { }
}