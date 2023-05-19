export interface ProductType {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount?: number;
    images: Array<string>;
    category: {
        _id: string;
        name: string;
        // add other properties here if needed
    };
    brand: {
        _id: string;
        name: string;
        // add other properties here if needed
    };
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
export interface ProductRowData {
    id: string;
    productImage: string;
    productName: string;
    productCategory: string;
    productPrice: number;
    productDiscount: number | undefined;
}
export interface CarouselProductType {
    _id: string;
    name?: string;
    slug?: string;
    description?: string;
    image: string;
}
