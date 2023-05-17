export interface CategoryType {
    _id: string;
    name: string;
    description?: string;
    productCount: number;
}

export interface NewCategory {
    name: string;
}
