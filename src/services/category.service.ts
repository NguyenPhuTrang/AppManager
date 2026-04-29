import { IBodyResponse, ICommonListQuery, IGetListResponse } from "../common/interfaces";
import axiosInstance, { ApiService } from "../plugins/axios";

class CategoryApiService extends ApiService {
    constructor() {
        super({
            baseUrl: '/category'
        }, axiosInstance);
    }

    getAll<T>(queryString: ICommonListQuery): Promise<IBodyResponse<IGetListResponse<T>>> {
        return this._getList<T>(queryString);
    }

    getDetail<R>(id: string | number): Promise<R> {
        return this._getDetail<R>(id);
    }
}

export const categoryApi = new CategoryApiService();