import { IEntertainment } from './entertainment.interface';
import { IProduct } from './menu-product.interface';

export interface ICalculatorPremium {
    id: number;
    time: string;
    date: string;
    countPeoples: number;
    namePeople: string,
    phone: number;
    allPrice: number;
    entertainmentOrder?: Array<IEntertainment>;
    prodPizza?: Array<IProduct>;
    prodJuice?: Array<IProduct>;
    packageName?: string;
    counterJuice?: number;
    statusOrder: string;
    email?: any;
}
// this.orderIDB,
// this.timeB,
// this.dateB.toString(),
// this.counterPeopleB,
// this.namePeopleOrder,
// this.phoneNumber,
// this.totalPricePremium,
// this.entertainmentAray,
// this.prodPizzaArr,
// this.prodJuiceArr,
// this.packageName,
// this.counterJuiceFinal,
// this.userEmail