import { type AxiosResponse } from 'axios';
import {
    ErrorCode,
    HttpStatus
} from './constants';

export interface IResponseError<T = any> {
    key: string;
    message: string;
    errorCode: ErrorCode;
    data?: T;
}

export interface IBodyResponse<T> extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: HttpStatus;
    message: string;
    error: string;
    data: T;
    errors?: IResponseError<any>[];
}

export interface RootState {
    active: boolean;
}
