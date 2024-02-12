import { productApi } from "../../services"

export async function getProduct() {
    const res = await productApi.getAll();;
    return res;
}