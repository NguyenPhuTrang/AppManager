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
        <div className='overflow-y-auto overflow-x-hidden overlay fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-500 bg-opacity-50 modal-animation'>
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-white w-[440px] flex flex-col rounded-[12px] relative">
                    <div className="flex items-center justify-start pt-[17px] pb-[18px] pl-5">
                        <h2 className="text-[18px] font-[500] text-[#1A2240] leading-normal">{title}</h2>
                    </div>
                    <div className='w-full overflow-x-auto'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;