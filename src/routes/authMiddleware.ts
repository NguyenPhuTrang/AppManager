import { useLocation, useNavigate } from "react-router-dom";
import localStorageAuthService from '../common/storages/authStorage';
import dayjs from './../plugins/dayjs';
import { useEffect } from "react";
import { PageName } from '../common/constants';

const useAuthMiddleware = () => {
    const navigate = useNavigate();
    const locations = useLocation();
    console.log(locations);
    
    useEffect(() => {
        const hasToken = localStorageAuthService.getAccessToken() ? true : false;
        const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
        const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), 'second');
        const IS_AUTHENTICATED = tokenExpiredAt && isExpired && hasToken;
        console.log("IS_AUTHENTICATED: ", IS_AUTHENTICATED);

        if (!IS_AUTHENTICATED) {
            // sessionStorage.setItem('redirect', location.pathname);
            navigate(PageName.LOGIN_PAGE, { replace: true });
        } else {
            navigate(PageName.PRODUCT_PAGE, { replace: true });
        }
    }, []);
};

export default useAuthMiddleware;
