export interface IFavourite {
    id?: number;
    jokeId?: string;
    iconUrl?: string;
    url?: string;
    value?: string;
    userId?: number;
}

export class Favourite implements IFavourite {
    constructor(
        public id?: number,
        public jokeId?: string,
        public iconUrl?: string,
        public url?: string,
        public value?: string,
        public userId?: number
    ) {}
}
