import { HttpStatus, PageName } from '../../common/constants';
import localStorageAuthService from '../../common/storages/authStorage';
import axios from 'axios';

export const logout = (redirectToLogin = true) => {
  localStorageAuthService.resetAll();
  if (redirectToLogin) {
    const currentPage = sessionStorage.getItem('redirect') || '/';
    if (currentPage !== PageName.LOGIN_PAGE) {
      sessionStorage.setItem('redirect', currentPage);
      window.location.href = PageName.LOGIN_PAGE;
    }
  }
};

export const useSendRefreshToken = async () => {
  try {
    const refresh_Token = localStorageAuthService.getRefreshToken();
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken : refresh_Token });
    if (response?.status === HttpStatus.OK) {
      localStorageAuthService.setAccessToken(response.data?.data.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(response.data?.data.expiresIn);
      return;
    } else {
      logout(true);
    }
  } catch (error) {
    logout(true);
  }
};
