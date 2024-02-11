import axiosInstance, { ApiService } from "../../plugins/axios";

class ProductApiService extends ApiService {
    getAll() {
        return this.client.get(`${this.baseUrl}/`);
    }
}

export const productApi = new ProductApiService({
    baseUrl: '/product',
}, axiosInstance)