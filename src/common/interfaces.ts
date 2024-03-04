import { type AxiosResponse } from 'axios';
import {
    ErrorCode,
    HttpStatus,
    OrderDirection
} from './constants';
import { UserProfile } from '../types';

export interface IResponseError<T = any> {
    key: string;
    message: string;
    errorCode: ErrorCode;
    data?: T;
};

export interface IBodyResponse<T> extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: HttpStatus;
    message: string;
    error: string;
    data: T;
    errors?: IResponseError<any>[];
};

export interface ICommonListQuery {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: OrderDirection | string;
    keyword?: string;
    price?: string;
    rating?: string;
};

export interface IGetListResponse<T> {
    items: T[];
    totalItems: number;
};

export interface ItemRootState {
    number: number;
    totalPages: number;
    totalData: number;
    limit: number;
};

export interface RootState {
    keyword: string;
    active: boolean;
    isCreateOrUpdate: string;
    page: ItemRootState;
    product: any[];
    userProfile: UserProfile;
};