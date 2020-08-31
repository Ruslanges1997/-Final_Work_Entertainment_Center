import { IEntertainment } from '../interfaces/entertainment.interface';


// export class Entertainment implements IEntertainment {
//     constructor(
//                  public id: number,
//                  public title: string,
//                  public text: string,
//                  public image?: string,
// ){ }
// }

export class Entertainment implements IEntertainment {
    constructor(
                 public id: number,
                 public imageGame: string,
                 public nameGame: string,
                 public descriptionGame: string,
                 public timeGame: string,
                 public priceGame:number
){ }
}

// id: number;
// imageGame: string;
// nameGame: string;
// descriptionGame: string;
// timeGame: string;
// priceGame: string;