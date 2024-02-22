import { IBodyLogin } from "../interfaces";
import { authApi } from "../services";
import localStorageAuthService from '../../../common/storages/authStorage';

export const useAuthStore = () => {
    async function login(body: IBodyLogin) {
        const res = await authApi.login(body);
        if (res.success) {
            localStorageAuthService.setAccessToken(res.data?.accessToken);
            localStorageAuthService.setAccessTokenExpiredAt(res.data?.expiresIn);
            localStorageAuthService.setRefreshToken(res.data?.refreshToken);
        }
        return res;
    }

    const hasToken = () => {
        return !!localStorageAuthService.getAccessToken();
    };

    return {
        login,
        hasToken
    }
}