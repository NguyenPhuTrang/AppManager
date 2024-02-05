import React from 'react';
import ToastMessage from '../components/Toast';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {

    const toastShowState = useSelector(state => state.toast.show);
    const toastTitleState = useSelector(state => state.toast.title);
    const toastMessageState = useSelector(state => state.toast.message);
    const toastTypeState = useSelector(state => state.toast.type);

    return (
        <div>
            <ToastMessage
                showNotification={toastShowState}
                title={toastTitleState}
                message={toastMessageState}
                type={toastTypeState}
            />
            <div className='flex flex-col w-screen h-screen overflow-y-auto overflow-x-auto'>
                {children}
            </div>
        </div>
    );
};

export default Layout;