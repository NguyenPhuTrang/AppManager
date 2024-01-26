import React from 'react';
import SidebarList from '../SidebarList';

const Sidebar = () => {
    return (
        <div className='lg:flex md:w-[100px] flex-col lg:w-[260px] items-center bg-white '>
            <div className='w-full py-[18px] pl-[18px] pr-[14px] flex items-center justify-between'>
                <img src='../icons/ic-logo.svg' alt='logo' />
                <img src='../icons/ic-indent-decrease.svg' alt='' />
            </div>

            <div className='w-full flex items-center justify-start py-[15px] px-[30px]'>
                <p className='text-[#8B909A] text-[11px] font-[400] leading-[14px]'>
                    QUẢN LÝ SẢN PHẨM
                </p>
            </div>
            <SidebarList />
        </div>
    );
};

export default Sidebar;