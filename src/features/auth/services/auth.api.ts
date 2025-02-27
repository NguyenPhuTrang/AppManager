import { IBodyResponse } from "../../../common/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";
import { updateUserProps } from "../../../types";
import { IBodyLogin, IBodyRegister, ILoginResponse } from "../interfaces";

class AuthApiService extends ApiService {
    login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
        return this.client.post(`${this.baseUrl}/login`, body);
    }
    register(body: IBodyRegister): Promise<IBodyResponse<ILoginResponse>> {
        return this.client.post(`${this.baseUrl}/register`, body);
    }
    updateProfile(body: updateUserProps): Promise<IBodyResponse<any>> {
        return this.client.patch(`user/${body.id}`, body.body);
    }
}

export const authApi = new AuthApiService({
    baseUrl: '/auth',
}, axiosInstance)