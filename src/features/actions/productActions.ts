import { ICommonListQuery } from "../../common/interfaces";
import { productApi } from "../../services"
import { createProductProps, updateProductProps } from "../../types";

export async function getActionProduct(queryString: ICommonListQuery ): Promise<any> {
    try {
        const response = await productApi.getAll<any>(queryString);
        return response;
    } catch (error) {
        console.error("Error fetching user products:", error);
        throw error;
    }
}

export async function createActionProduct(body: createProductProps): Promise<any> {
    try {
        const res = await productApi.create(body);
        return res;

    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

export async function updateActionProduct(body: updateProductProps): Promise<any> {
    try {
        const res = await productApi.create(body);
        return res;

    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

export async function deleteActionProduct(id: string): Promise<any> {
    try {
        const res = await productApi.delete(id);
        return res;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}