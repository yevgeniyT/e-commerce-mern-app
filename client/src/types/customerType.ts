export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface BaseCustomer {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    billingAddress: Address;
    shippingAdress: Address;
    avatarImage: string;
}

export interface CustomerType extends BaseCustomer {
    customerId: string;
    isBanned: boolean;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface CustomerPayload extends Partial<BaseCustomer> {}
