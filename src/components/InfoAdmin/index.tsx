import React from 'react';

const InFoAdmin = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='relative mr-5'>
                <img src='../icons/ic-bell.svg' alt='bell'/>
                <div className='absolute top-[-5px] right-[-5px] w-[18px] h-[18px] bg-[#EA5455] rounded-full flex items-center justify-center'>
                    <p className='text-white select-none'>4</p>
                </div>
            </div>
            <div className='flex items-center justify-center w-[38px] h-[38px] relative'>
                <img src='../images/avatar-admin.png' className='rounded-full' alt='avatar'/>
                <span className='p-[2px] rounded-full bg-[#fff] flex items-center justify-center absolute bottom-0 right-0'>
                    <span className='w-2 h-2 rounded-full bg-[#28C76F]'></span>
                </span>
            </div>
        </div>
    );
};

export default InFoAdmin;