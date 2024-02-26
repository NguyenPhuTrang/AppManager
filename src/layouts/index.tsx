import React from 'react';
import ToastMessage from '../components/Toast';
import { useSelector } from 'react-redux';

interface Props {
    children: React.ReactNode;
}   

const Layout = ({ children }: Props) => {

    const toastShowState = useSelector((state: any) => state.toast.show);
    const toastTitleState = useSelector((state: any) => state.toast.title);
    const toastMessageState = useSelector((state: any) => state.toast.message);
    const toastTypeState = useSelector((state: any) => state.toast.type);

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