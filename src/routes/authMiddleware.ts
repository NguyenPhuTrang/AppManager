// import { useNavigate } from 'react-router-dom';
import localStorageAuthService from '../common/storages/authStorage';
import dayjs from 'dayjs';

const isAuthenticated = () => {
    const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
    const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), 'second');
    const hasToken = localStorageAuthService.getAccessToken() ? true : false;

    console.log(tokenExpiredAt);
    console.log(hasToken);
    console.log(isExpired);

    const IS_AUTHENTICATED = tokenExpiredAt && !isExpired && hasToken;

    console.log('IS_AUTHENTICATED: ', IS_AUTHENTICATED);
    

    if (!IS_AUTHENTICATED) {
        return false;
    }
    return dayjs().isBefore(dayjs(tokenExpiredAt));
};

const useAuthMiddleware = () => {
    const checkAuthentication = () => {
        const isAuthenticatedUser = isAuthenticated();
        if (!isAuthenticatedUser) {
            // window.location.href = '/login';
            console.log("isAuthenticatedUser: " + isAuthenticatedUser);
        }
    };
    return { checkAuthentication };
};

export default useAuthMiddleware;
