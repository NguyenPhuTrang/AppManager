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

export interface createProductForm {
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

export interface updateProductFormItem {
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
}
export interface updateProductForm {
    id: string;
    body: updateProductFormItem;
}

export interface deleteProductProps {
    id: string;
}