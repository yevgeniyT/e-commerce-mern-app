export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface BaseCustomer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    billingAddress: Address;
    shippingAddress: Address;
    avatarImage: string;
}

export interface CustomerType extends BaseCustomer {
    customerId: string;
    isBanned: boolean;
    isAdmin: boolean;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface CustomerPayload extends Partial<BaseCustomer> {}
