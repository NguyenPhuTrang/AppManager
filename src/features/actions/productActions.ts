import { productApi } from "../../services"
import { createProductProps } from "../../types";

export async function getProduct() {
    const res = await productApi.getAll();;
    return res;
}

export async function createProduct(body: createProductProps): Promise<any> {
    try {
        const res = await productApi.create(body);
        return res;
        
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}