import { Dispatch } from 'redux';
import { setShowToast, setTitleToast, setMessageToast, setTypeToast } from '../features/actions/showToast';
import { useDispatch } from 'react-redux';
import dayjs from './../plugins/dayjs/index';
import { DATE_TIME_FORMAT } from './constants';

export function formatDate(date: Date | string) {
    return dayjs(date).format(DATE_TIME_FORMAT.YYYY_MM_DD_DASH);
}

// Custom hook để sử dụng dispatch
export function useToastDispatch() {
    return useDispatch<Dispatch<any>>();
}

export function useNotification() {
    const dispatch = useToastDispatch();

    const showErrorNotification = (title: string, message: string) => {
        dispatch(setShowToast(true));
        dispatch(setTitleToast(title));
        dispatch(setMessageToast(message));
        dispatch(setTypeToast('error'));
    };

    const showSuccessNotification = (title: string, message: string) => {
        dispatch(setShowToast(true));
        dispatch(setTitleToast(title));
        dispatch(setMessageToast(message));
        dispatch(setTypeToast('success'));
    };

    const showWarningsNotification = (title: string, message: string) => {
        dispatch(setShowToast(true));
        dispatch(setTitleToast(title));
        dispatch(setMessageToast(message));
        dispatch(setTypeToast('warning'));
    };

    const showInfoNotification = (title: string, message: string) => {
        dispatch(setShowToast(true));
        dispatch(setTitleToast(title));
        dispatch(setMessageToast(message));
        dispatch(setTypeToast('info'));
    };

    return {
        showErrorNotification,
        showSuccessNotification,
        showWarningsNotification,
        showInfoNotification,
    };
}
