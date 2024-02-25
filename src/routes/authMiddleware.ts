import { useNavigate } from "react-router-dom";
import localStorageAuthService from '../common/storages/authStorage';
import dayjs from './../plugins/dayjs';
import { PageName } from '../common/constants';

const useAuthMiddleware = () => {
    const navigate = useNavigate();

    const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
    const hasToken = localStorageAuthService.getAccessToken() ? true : false;
    const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), 'second');
    console.log(isExpired);

    const IS_AUTHENTICATED = tokenExpiredAt && !isExpired && hasToken;
    const currentPath = window.location.pathname;
    console.log(IS_AUTHENTICATED);


    if (!IS_AUTHENTICATED) {
        const redirectPath = window.location.href;
        sessionStorage.setItem('redirect', redirectPath);
        navigate(PageName.LOGIN_PAGE, { replace: true });
    } else {
        if (currentPath === PageName.LOGIN_PAGE) {
            navigate(PageName.PRODUCT_PAGE, { replace: true });
        }
        return;
    }
};

export default useAuthMiddleware;
