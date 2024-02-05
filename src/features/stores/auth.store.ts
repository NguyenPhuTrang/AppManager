import { IBodyLogin } from "../auth/interfaces";
import { authApi } from "../auth/services";
import localStorageAuthService from '../../common/storages/authStorage';

export const useAuthStore = () => {
    async function login(body: IBodyLogin) {
        const res = await authApi.login(body);
        console.log(res);
        localStorageAuthService.setAccessTokenExpiredAt(res.data?.expiresIn)
        console.log(localStorageAuthService.setAccessTokenExpiredAt(res.data?.expiresIn));
        if (res.success) {
            localStorageAuthService.setAccessToken(res.data?.accessToken);
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