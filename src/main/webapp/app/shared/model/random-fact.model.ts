export interface IRandomFact {
    id?: string;
    icon_url?: string;
    url?: string;
    jokeId?: string;
    value?: string;
    userId?: number;
    isFavourite?: boolean;
}

export class RandomFact implements IRandomFact {
    constructor(
        public id?: string,
        public icon_url?: string,
        public url?: string,
        jokeId?: string,
        public value?: string,
        public userId?: number,
        isFavourite?: boolean
    ) {}
}
