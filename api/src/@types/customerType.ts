export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface BaseCustomer {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  billingAddress: Address
  shippingAddress: Address
  avatarImage: string
}

export interface CustomerType extends BaseCustomer {
  customerId: string
  isBanned: boolean
  isAdmin: boolean
}

//optional fuilds used to handle type error in userController as, all fuilds can be undefined if user not provide input. Partial utility type to make all the properties in BaseCustomer optional.
export interface CustomerPayload extends Partial<BaseCustomer> {
  customerId?: string
  hashPassword?: string
}
