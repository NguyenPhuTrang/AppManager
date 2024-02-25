import { IBodyResponse } from "../../../common/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";
import { IUserChangePassword, IUserUpdatePassword } from "../interfaces";

class UserApiService extends ApiService {
    _getOwnProfile<R>(): Promise<IBodyResponse<R>> {
        return this.client.get('/auth/get-user-profile');
    }

    updatePassword(body: IUserUpdatePassword): Promise<IBodyResponse<any>> {
        return this.client.post(`${this.baseUrl}/update-password`, body);
    }

    forgotPassword(email: string): Promise<IBodyResponse<any>> {
        return this.client.post(`${this.baseUrl}/forgot-password`, {
            email,
        });
    }

    changePassword(body: IUserChangePassword): Promise<IBodyResponse<any>> {
        return this.client.post(`${this.baseUrl}/change-password`, body);
    }
}

export const userApiService = new UserApiService({ baseUrl: '/user' }, axiosInstance);