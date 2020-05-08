export interface Category {
    id: number;
    name: string;
    active: boolean;
    mainImageUrl: string;
    images: [ {
        id: number;
        url: string;
        isMain: boolean;
    }];
 }
