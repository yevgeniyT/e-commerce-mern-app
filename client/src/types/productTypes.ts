export interface ProductType {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount?: number;
    images: Array<string>;
    category: string;
    brand: string;
    stockQuantity: number;
    ratings: Array<number>;
    averageRating: number;
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

export interface FilteredProductsParams {
    priceRange: number[];
    checkedCategories: string[];
    checkedBrands: string[];
}
