import { IEntertainment } from '../interfaces/entertainment.interface';

export class Entertainment implements IEntertainment {
    constructor(
        public id: number,
        public imageGame: string,
        public nameGame: string,
        public descriptionGame: string,
        public timeGame: string,
        public priceGame: number,
        public count: number = 1,
    ) { }
}

