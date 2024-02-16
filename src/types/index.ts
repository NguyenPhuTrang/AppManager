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
    price: string;
    quantity: string;
    description: string;
    image: string;
}

export interface createProductForm {
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
}

export interface updateProductProps {
    name: string;
    price: string;
    quantity: string;
    description: string;
    image: string;
}

export interface updateProductForm {
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
}