import { Dispatch } from 'redux';
import { setShowToast, setTitleToast, setMessageToast, setTypeToast } from '../features/actions/showToast';
import { useDispatch } from 'react-redux';

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
