export interface Category {
    id?: number;
    name: string;
    active: boolean;
    mainImageUrl?: string;
    images?: [ {
        id: number;
        url: string;
        isMain: boolean;
        type?: number;
    }];
    subCategories?: [ {
        id: number;
        name: string;
        active: boolean;
        categoryId: number;
    }];
 }
