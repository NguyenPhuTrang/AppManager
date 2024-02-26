import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorageAuthService from '../common/storages/authStorage';
import { PageName } from '../common/constants';

const useAuthMiddleware = () => {
    const navigate = useNavigate();
    const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
    const hasToken = localStorageAuthService.getAccessToken() ? true : false;
    // const isExpired = dayjs().isAfter(dayjs(tokenExpiredAt), 'second');
    const isAuthenticated = tokenExpiredAt && hasToken;
    console.log(isAuthenticated);
    
    const currentPath = window.location.pathname;
    console.log(currentPath);
    
    useEffect(() => {
        if (!isAuthenticated) {
            const redirectPath = window.location.href;
            sessionStorage.setItem('redirect', redirectPath);
            navigate(PageName.LOGIN_PAGE, { replace: true });
        } else if (currentPath === PageName.LOGIN_PAGE) {
            navigate(PageName.PRODUCT_PAGE, { replace: true });
        }
        return;
    }, [isAuthenticated, currentPath, navigate]);
};

export default useAuthMiddleware;
