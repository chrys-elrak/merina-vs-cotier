export interface Versus {
    reports: any[];
    _id: string;
    items: Item[];
    author: Author;
    createdAt: Date;
    __v: number;
    voters: string[]
}

export interface Author {
    _id: string;
    email: string;
    uuid: string;
    name: string;
    picture: string;
    createdAt: Date;
    __v: number;
}

export interface Item {
    _id: string;
    title: string;
    description: string;
    votes: any[];
    image: Image;
    createdAt: Date;
    __v: number;
}


export interface Image {
    filename: string;
    mimetype: string;
}