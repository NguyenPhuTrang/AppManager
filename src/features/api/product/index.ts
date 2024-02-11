import { productStore } from "../../stores/product.store";

export const ProductApi = () => {
    async function getAllProducts() {
        const res = await productStore().getProduct();
        return res;
    };

    return {
        getAllProducts
    }
}
