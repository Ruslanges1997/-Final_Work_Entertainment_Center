import { IGallery } from '../interfaces/gallary.interface'

export class Gallery implements IGallery {
    constructor(
        public id: number,
        public src: string,
        public title: string,
    ) { }
}