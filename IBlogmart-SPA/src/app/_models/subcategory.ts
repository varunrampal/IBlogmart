import { Category } from './category';

export interface Subcategory {
    id?: number;
    name: string;
    active: boolean;
    categoryId: number;
    category?: Category;
    mainImageUrl?: string;
    images?: [ {
        id: number;
        url: string;
        isMain: boolean;
        type?: number;
    }];
   }