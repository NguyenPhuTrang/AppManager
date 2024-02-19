import axiosInstance, { ApiService } from "../plugins/axios";
import { IBodyResponse, ICommonListQuery, IGetListResponse } from "../common/interfaces";
import { createUserProps, updateUserProps } from "../types";

class UserApiService extends ApiService {
    constructor() {
        super({
            baseUrl: '/user'
        }, axiosInstance);
    }

    getAll<T>(queryString: ICommonListQuery): Promise<IBodyResponse<IGetListResponse<T>>> {
        return this._getList<T>(queryString);
    }

    create(body: createUserProps): Promise<IBodyResponse<any>> {
        return this._create(body);
    }

    getDetail<R>(id: string | number): Promise<R> {
        return this._getDetail<R>(id);
    }

    update(body: updateUserProps): Promise<IBodyResponse<any>> {
        return this._update(body.id, body.body);
    }

    delete(id: string): Promise<IBodyResponse<any>> {
        return this._delete<any>(id);
    }
}

export const userApi = new UserApiService();
