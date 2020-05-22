export interface Subcategory {
    id?: number;
    name: string;
    active: boolean;
    categoryId: number;
    mainImageUrl?: string;
    images?: [ {
        id: number;
        url: string;
        isMain: boolean;
        type?: number;
    }];
   }