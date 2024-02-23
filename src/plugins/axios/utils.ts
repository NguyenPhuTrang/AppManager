// import { useDispatch } from 'react-redux';
import { HttpStatus, PageName } from '../../common/constants';
import localStorageAuthService from '../../common/storages/authStorage';
import axios from 'axios';
// import { setProfile } from '../../features/actions/userProfile';

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

export const sendRefreshToken = async () => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${API_URL}/auth/refresh-token`, {
      withCredentials: false,
      headers: localStorageAuthService.getHeaderRefreshToken(),
    });

    if (response?.status === HttpStatus.OK) {
      localStorageAuthService.setAccessToken(response.data?.data.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(response.data?.data.expiresIn);
      localStorageAuthService.setRefreshToken(response.data?.data.refreshToken);
      return;
    } else {
      logout(true);
    }
  } catch (error) {
    logout(true);
  }
};

export const useGetProfile = async () => {
  // const dispatch = useDispatch();
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${API_URL}/auth/get-user-profile`, {
      withCredentials: false,
      headers: localStorageAuthService.getHeader(),
    });

    console.log(response);
      
    // if (response?.status === HttpStatus.OK) {
    //   const userProfile = response.data.data.user;
    //   console.log(userProfile);
    //   dispatch(setProfile(userProfile));
    // }
  } catch (error) {
    console.log(error);
  }
};