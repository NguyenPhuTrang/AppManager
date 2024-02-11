import { productApi } from "../services"

export const productStore = () => {
    async function getProduct() {
        const res = await productApi.getAll();
        // console.log(res);
        return res;
    }

    return {
        getProduct,
    }
}