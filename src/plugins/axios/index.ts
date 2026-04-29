import { HttpStatus } from '../../common/constants';
import { type IBodyResponse } from '../../common/interfaces';
import axios, {
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse,
} from 'axios';
import dayjs from '../dayjs';
import { sendRefreshToken, logout } from './utils';
import { throttle } from 'lodash';
import localStorageAuthService from '../../common/storages/authStorage';

const options: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Timezone': dayjs().format('Z'),
    'X-Timezone-Name': dayjs.tz.guess(),
  } as unknown as AxiosRequestHeaders,
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
  withCredentials: false,
};

const axiosInstance = axios.create(options);

const throttled = throttle(sendRefreshToken, 10000, { trailing: false });

axiosInstance.interceptors.request.use(async (config: any) => {
  const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
  if (tokenExpiredAt && dayjs(tokenExpiredAt).isBefore()) {
    await throttled();
  }

  Object.assign(config, {
    headers: {
      ...localStorageAuthService.getHeader(),
      ...config.headers,
    },
  });
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response?.data) {
      return {
        success: true,
      };
    }
    if (typeof response?.data === 'string') {
      response.data = JSON.parse(response.data);
    }
    response.data = {
      ...response?.data,
      success: true,
    };
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Xử lý 419 — token hết hạn, refresh rồi retry
    if (error?.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await sendRefreshToken();
        Object.assign(originalRequest, {
          headers: {
            ...localStorageAuthService.getHeader(),
            ...originalRequest.headers,
          },
        });
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logout(true);
        return Promise.reject(refreshError);
      }
    }

    if (error.code === 'ERR_NETWORK') {
      error.request.data = {
        ...(error?.request?.data || {}),
        success: false,
        isRequestError: true,
        message: error.message,
        code: HttpStatus.NETWORK_ERROR,
      };
      return error.request.data;
    } else if (error.response) {
      if (typeof error?.response?.data === 'string') {
        error.response.data = JSON.parse(error.response.data);
      }
      if (error?.response?.data) {
        error.response.data = {
          ...((error?.response?.data as object) || {}),
          success: false,
        };
      }
      return error.response.data as IBodyResponse<unknown>;
    } else if (error.request) {
      error.request.data = {
        ...(error?.request?.data || {}),
        success: false,
        isRequestError: true,
        message: error.message,
      };
      return error.request?.data;
    }
    return {
      ...error,
      config: error?.config as AxiosRequestConfig,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusText: 'System error, please try again later',
      headers: error?.request?.headers || {},
      success: false,
      message: 'System error, please try again later',
      data: null,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  },
);

export default axiosInstance;

export * from './api';
export * from './utils';