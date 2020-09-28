import { IOurTeam } from '../interfaces/our-team.interface';

export class OurTeam implements IOurTeam {
    constructor(
        public id: number,
        public nameWorker: string,
        public professionWorker: string,
        public imageWorker: string,
    ) { }
}