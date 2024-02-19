import { useNavigate } from "react-router-dom";
import localStorageAuthService from '../common/storages/authStorage';
import dayjs from './../plugins/dayjs';
import { useEffect } from "react";
import { PageName } from '../common/constants';

const useAuthMiddleware = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hasToken = localStorageAuthService.getAccessToken() ? true : false;
        const hasRefreshToken = localStorageAuthService.getRefreshToken() ? true : false;
        const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
        const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), 'second');
        const IS_AUTHENTICATED = tokenExpiredAt && isExpired && hasToken && hasRefreshToken;
        const currentPath = window.location.pathname;
        
        if (!IS_AUTHENTICATED) {
            const redirectPath = window.location.href;
            sessionStorage.setItem('redirect', redirectPath);
            navigate(PageName.LOGIN_PAGE, { replace: true });
        } else {
            if(currentPath === PageName.LOGIN_PAGE) {
                navigate(PageName.PRODUCT_PAGE, { replace: true });
            }
            return;
        }
    }, [navigate]);
};

export default useAuthMiddleware;
