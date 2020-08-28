import { IEntertainment } from '../interfaces/entertainment.interface';


export class Entertainment implements IEntertainment {
    constructor(
                 public id: string,
                 public title: string,
                 public text: string,
                 public image?: string,
){ }
}