// import productStore from "../../actions/product.store";
import * as actions from "../../actions";


export const ProductApi = () => {
    async function getAllProducts() {
        const res = await actions.getProduct();
        return res;
    };

    return {
        getAllProducts
    }
}
