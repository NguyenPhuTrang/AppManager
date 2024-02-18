import axiosInstance, { ApiService } from "../plugins/axios";
import { createProductProps, updateProductProps } from "../types";
import { IBodyResponse, ICommonListQuery, IGetListResponse } from "../common/interfaces";

class ProductApiService extends ApiService {
    constructor() {
        super({
            baseUrl: '/product'
        }, axiosInstance);
    }

    // getAll() {
    //     return this.client.get(this.baseUrl);
    // }

    getAll<T>(queryString: ICommonListQuery): Promise<IBodyResponse<IGetListResponse<T>>> {
        return this._getList<T>(queryString);
    }

    create(body: createProductProps): Promise<IBodyResponse<any>> {
        return this._create(body);
    }

    getDetail<R>(id: string | number): Promise<R> {
        return this._getDetail<R>(id);
    }

    update(body: updateProductProps): Promise<IBodyResponse<any>> {
        return this._update(body.id, body.body);
    }

    delete(id: string): Promise<IBodyResponse<any>> {
        return this._delete<any>(id);
    }
}

export const productApi = new ProductApiService();
