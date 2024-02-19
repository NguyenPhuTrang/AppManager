export interface LoginFormInputs {
    email: string;
    password: string;
}

export interface Product {
    id: string;
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

export interface productForm {
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
}

export interface updateProductPropsItem {
    name: string;
    price: string;
    quantity: string;
    description: string;
    image: string;
}
export interface updateProductProps {
    id: string;
    body: updateProductPropsItem;
}

export interface deleteProductProps {
    id: string;
}

export interface createUserProps {
    name: string;
    email: string;
    numberPhone: string;
    birthday: string;
    avaterUrl: string;
}

export interface updateUserPropsItem {
    name: string;
    email: string;
    numberPhone: string;
    birthday: string;
    avaterUrl: string;
}
export interface updateUserProps {
    id: string;
    body: updateProductPropsItem;
}

//user

export interface User {
    id: string;
    name: string;
    email: string;
    numberPhone: string;
    birthday: string;
    avatarUrl: string;
};