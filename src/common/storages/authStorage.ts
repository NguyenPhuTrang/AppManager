import { DEFAULT_LANGUAGE, SupportLanguage } from '../constants';
import { storage } from './localStorage'

const BUFFER_TIME = 60 * 1000;

export const enum AUTH_SERVICE_KEY {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    USER = 'USER',
    ROLE = 'ROLE',
    LANGUAGE = 'LANGUAGE',
    ACCESS_TOKEN_EXPIRED_AT = 'ACCESS_TOKEN_EXPIRED_AT',
    REFRESH_TOKEN_EXPIRED_AT = 'REFRESH_TOKEN_EXPIRED_AT',
}

class LocalStorageAuthService {
    getLanguage(): SupportLanguage {
        return (storage.getLocalStorage(AUTH_SERVICE_KEY.LANGUAGE) ||
            DEFAULT_LANGUAGE) as SupportLanguage;
    }
    setAccessToken(token: string): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
    }
    getAccessToken(): string {
        return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
    }
    resetAccessToken(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
    }

    getAccessTokenExpiredAt(): number {
        return +storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT);
    }
    setAccessTokenExpiredAt(expiredIn: number): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT, String(expiredIn));
    }
    resetAccessTokenExpiredAt(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT, '');
    }

    // setLoginUser(user: null | IUserProfile, role: IUserRole | null): void {
    //     if (!user) {
    //         storage.setLocalStorage(AUTH_SERVICE_KEY.USER, '');
    //     }
    //     if (!isStringify(user)) {
    //         return;
    //     }
    //     storage.setLocalStorage(AUTH_SERVICE_KEY.USER, JSON.stringify(user));
    //     storage.setLocalStorage(AUTH_SERVICE_KEY.ROLE, JSON.stringify(role));
    // }

    getHeader() {
        return {
            Authorization: `Bearer ${this.getAccessToken()}`,
            'Accept-Language': this.getLanguage() || DEFAULT_LANGUAGE,
        };
    }

    resetAll(): void {
        this.resetAccessToken();
        this.resetAccessTokenExpiredAt();
        // this.setLoginUser(null, null);
    }


}

export const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;