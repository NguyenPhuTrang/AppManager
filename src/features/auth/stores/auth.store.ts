import { IBodyLogin, IBodyRegister } from "../interfaces";
import { authApi } from "../services";
import localStorageAuthService from '../../../common/storages/authStorage';
import { updateUserProps } from "../../../types";

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

    async function register(body: IBodyRegister) {
        try {
            const res = await authApi.register(body);
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }

    async function updateProfile(profile: updateUserProps) {
        try {
            const res = await authApi.updateProfile(profile);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const hasToken = () => {
        return !!localStorageAuthService.getAccessToken();
    };

    return {
        login,
        register,
        updateProfile,
        hasToken
    }
}