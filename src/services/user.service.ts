import axiosInstance, { ApiService } from "../plugins/axios";
import { IBodyResponse } from "../common/interfaces";

class UserApiService extends ApiService {
    constructor() {
        super({
            baseUrl: '/user'
        }, axiosInstance);
    }

    getAllUsers(): Promise<IBodyResponse<any>> {
        return this.client.get(`${this.baseUrl}/`);
    }

    createUser(userData: any): Promise<IBodyResponse<any>> {
        return this.client.post(`${this.baseUrl}/`, userData);
    }

    getUserDetail(userId: string | number): Promise<IBodyResponse<any>> {
        return this.client.get(`${this.baseUrl}/${userId}`);
    }

    updateUser(userId: string | number, userData: any): Promise<IBodyResponse<any>> {
        return this.client.patch(`${this.baseUrl}/${userId}`, userData);
    }

    deleteUser(userId: string | number): Promise<IBodyResponse<any>> {
        return this.client.delete(`${this.baseUrl}/${userId}`);
    }
}

export const userApi = new UserApiService();
