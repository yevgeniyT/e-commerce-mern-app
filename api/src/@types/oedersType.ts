export interface OrderItemType {
  product: string
  quantity: number
  price: number
}

export interface OrderType {
  user: string
  items: Array<OrderItemType>
  deliveryOption: number
  totalPrice: number
  status: string
  createdAt?: Date
  updatedAt?: Date
}
