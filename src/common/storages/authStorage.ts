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

    getHeader() {
        return {
          Authorization: `Bearer ${this.getAccessToken()}`,
          'Accept-Language': this.getLanguage() || DEFAULT_LANGUAGE,
        };
      }
}

export const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;