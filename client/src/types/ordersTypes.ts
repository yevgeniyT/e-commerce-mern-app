export interface OrderProductType {
    images: Array<string>;
    name: string;
    _id: string;
}

export interface OrderItemType {
    product: string;
    quantity: number;
    price: number;
    _id?: string;
}

export interface OrderType {
    _id?: string;
    items: Array<OrderItemType>;
    deliveryCost: number;
    totalPrice: number;
}
