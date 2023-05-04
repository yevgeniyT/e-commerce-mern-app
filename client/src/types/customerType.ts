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
    address: Address;
    avatarImage: string;
}

export interface CustomerType extends BaseCustomer {
    customerId: string;
    isBanned: boolean;
}
