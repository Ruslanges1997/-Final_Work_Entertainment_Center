import { IMenuCategory } from '../interfaces/meny-category.interface'


export class MenuCategory implements IMenuCategory {
    constructor(
        public id: number,
        public nameEN: string,
        public nameUA: string,
    ) { }
}