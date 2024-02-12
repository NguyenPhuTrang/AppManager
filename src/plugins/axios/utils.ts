import { HttpStatus, PageName } from '../../common/constants';
import localStorageAuthService from '../../common/storages/authStorage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLogout = (redirectToLogin = true) => {
  localStorageAuthService.resetAll();
  const navigate = useNavigate();
  if (redirectToLogin) {
    const currentPage = sessionStorage.getItem('redirect') || '/';
    if (currentPage !== PageName.LOGIN_PAGE) {
      sessionStorage.setItem('redirect', currentPage);
      navigate(PageName.LOGIN_PAGE);
    }
  }
};

export const useSendRefreshToken = async () => {
  let response;
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    response = await axios.get(`${API_URL}/auth/refresh-token`, { withCredentials: true });
    if (response?.status === HttpStatus.OK) {
      localStorageAuthService.setAccessToken(response.data?.data.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(response.data?.data.expiresIn);
      return;
    }
    useLogout(true);
    return;
  } catch (error) {
    useLogout(true);
    return;
  }
};
