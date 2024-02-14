import { HttpStatus, PageName } from '../../common/constants';
import localStorageAuthService from '../../common/storages/authStorage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const logout = (redirectToLogin = true) => {
  localStorageAuthService.resetAll();
  // const navigate = useNavigate();
  if (redirectToLogin) {
    const currentPage = sessionStorage.getItem('redirect') || '/';
    if (currentPage !== PageName.LOGIN_PAGE) {
      sessionStorage.setItem('redirect', currentPage);
      // navigate(PageName.LOGIN_PAGE);
    }
  }
};

export const useSendRefreshToken = async () => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjcxNDA3NzM3ZDdiZGNkZjUwNWM5YiIsImVtYWlsIjoibXIudnVhbjI0QGdtYWlsLmNvbSIsImlhdCI6MTcwNzgzNjgwOCwiZXhwIjoxNzA3OTIzMjA4fQ.Gd62cW2RCoYRmdO7x60cYETHOjKKiExrLjtasZuLTbI'
    const config = {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      },
      withCredentials: true
    };
    const response = await axios.get(`${API_URL}/auth/refresh-token`, config);
    console.log(response);
    if (response?.status === 200) {
      return response.data;
    } else {
      logout(true);
    }
  } catch (error) {
    logout(true);
  }
};
