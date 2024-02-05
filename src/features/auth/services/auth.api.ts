import { IBodyResponse } from "../../../common/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";
import { IBodyLogin, ILoginResponse } from "../interfaces";

class AuthApiService extends ApiService {
    login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
        return this.client.post(`${this.baseUrl}/login`, body);
    }
}

export const authApi = new AuthApiService({
    baseUrl: '/auth',
}, axiosInstance)