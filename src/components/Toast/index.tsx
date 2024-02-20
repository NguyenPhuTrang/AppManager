import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowToast } from '../../features/actions/showToast';

interface Props {
    showNotification: boolean;
    title?: string;
    message?: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

const ToastMessage = ({
    showNotification,
    title,
    message,
    type,
}: Props) => {

    const [showToast, setShowToastMessage] = useState(showNotification);
    const dispatch = useDispatch();

    const icons: { [key: string]: string } = {
        success: '../icons/ic-sucess.svg',
        error: '../icons/ic-error.svg',
        warning: '../icons/ic-warning.svg',
        info: '../../icons/ic-informative.svg',
    };

    const backgroundColors: { [key: string]: string } = {
        success: 'bg-[#F6FFF9]',
        error: 'bg-[#FFF5F3]',
        warning: 'bg-[#FFF8EC]',
        info: 'bg-[#F5F9FF]',
    };

    const borderColors: { [key: string]: string } = {
        success: 'border-[#48C1B5]',
        error: 'border-[#F4B0A1]',
        warning: 'border-[#F7D9A4]',
        info: 'border-[#9DC0EE]',
    };

    const handleCloseToast = useCallback(() => {
        dispatch(setShowToast(false));
        setShowToastMessage(false);
    }, [dispatch]);

    useEffect(() => {
        setShowToastMessage(showNotification);
        const timeout = setTimeout(() => {
            handleCloseToast();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [showNotification, handleCloseToast]);

    const iconSrc = icons[type];
    const bgColor = backgroundColors[type];
    const borderColor = borderColors[type];

    return (
        <div
            className={`p-5 flex gap-4 items-start border-solid border-[1px] 
            ${borderColor} rounded-xl fixed top-[20px] right-[10px]
            animate-fade-left animate-duration-300 animate-ease-in
            ${bgColor} z-40 ${showToast ? '' : 'hidden'} 
        `}>
            <div className='flex items-start justify-center select-none'>
                <img src={iconSrc} alt={type} className='w-6 h-6' />
            </div>
            <div className='flex flex-col items-start pr-2'>
                <h3 className='text-[14px] font-[600] leading-[20px] select-none text-[#27303A]'>{title}</h3>
                <p className='text-[12px] font-[400] leading-[20px] select-none text-[#2F3F53]'>{message}</p>
            </div>
            <div className='flex items-center justify-center'>
                <img
                    onClick={handleCloseToast}
                    src="../icons/ic-close-toast.svg"
                    alt=""
                    className='w-3 h-3 cursor-pointer'
                />
            </div>
        </div>
    );
};

export default ToastMessage;
