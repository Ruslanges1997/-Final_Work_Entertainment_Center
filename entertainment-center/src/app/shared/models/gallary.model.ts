
import { IGallery } from '../interfaces/gallary.interface'


// export class Gallery implements IGallery {
//     id: number,
//     imageName: string,
//     image: string,
//         ) { }
//     }

export class Gallery implements IGallery {
    constructor(
        public id: number,
        public imageName: string,
        public image: string,
    ) { }
}