import { AxiosResponse } from "axios";
import axiosInstance, { ApiService } from "../plugins/axios";
import { createProductProps } from "../types";
import { IBodyResponse } from "../common/interfaces";

class ProductApiService extends ApiService {
    getAll() {
        return this.client.get(`${this.baseUrl}/`);
    }
    create(body: createProductProps): Promise<IBodyResponse<any>> {
        return this.client.post(`${this.baseUrl}/`, body);
    }
}

export const productApi = new ProductApiService({
    baseUrl: '/product',
}, axiosInstance)