export interface CategoryType {
    _id: string;
    name: string;
    description?: string;
    productCount: number;
    slug?: string;
}

export interface NewCategory {
    name: string;
}
