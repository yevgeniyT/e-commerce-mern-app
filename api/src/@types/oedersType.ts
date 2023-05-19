export interface OrderItemType {
  product: string
  quantity: number
  price: number
}

export interface OrderType {
  customer: string
  items: Array<OrderItemType>
  deliveryCost: number
  totalPrice: number
  status: string
  createdAt?: Date
  updatedAt?: Date
}
