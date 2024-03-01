import React from 'react';

interface Props {
    children: React.ReactNode;
    title: string;
}

const Modal = ({
    children,
    title
}: Props) => {
    return (
        <div className='relative z-10'>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className='fixed inset-0 w-screen overflow-y-auto z-50 animate-fade-up animate-once animate-ease-out animate-duration-500'>
                <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
                    <div className="bg-white w-[440px] flex flex-col rounded-[12px] relative">
                        <div className="flex items-center justify-start pt-[17px] pb-[18px] pl-5">
                            <h2 className="text-[18px] font-[500] text-[#1A2240] leading-normal">{title}</h2>
                        </div>
                        <div className='w-full overflow-y-auto'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;