export interface ProductType {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: Array<string>;
    category: string;
    brand: string;
    stockQuantity: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Pagination {
    currentPage: number;
    previousPage: number;
    nextPage: number;
    totalNumberOfProducts: number;
    totalPages: number;
}
