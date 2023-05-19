export interface OrderItemType {
    product: string;
    quantity: number;
    price: number;
}

export interface OrderType {
    items: Array<OrderItemType>;
    deliveryCost: number;
    totalPrice: number;
}
