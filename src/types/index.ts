export interface LoginFormInputs {
    email: string;
    password: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
};

export interface createProductProps {
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
}