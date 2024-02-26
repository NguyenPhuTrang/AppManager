import React, { useState } from 'react';
import SidebarList from '../SidebarList';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div
            className={`lg:flex md:hidden sm:hidden flex-col items-center bg-white 
                ${showSidebar ? 'lg:min-w-[260px]' : 'lg:w-[80px]'}
            `}>
            <div 
                className={`w-full py-[18px] pl-[18px] pr-[14px] flex items-center 
                    ${showSidebar ? 'justify-between' : 'justify-end'}
                `}>
                {
                    showSidebar &&
                    <img src='../icons/ic-logo.svg' alt='logo' className='' />
                }
                <img
                    onClick={() => setShowSidebar(!showSidebar)}
                    src='../icons/ic-indent-decrease.svg'
                    alt=''
                    className='w-6 h-7'
                />
            </div>

            <div 
                className={`w-full flex items-center justify-start py-[15px] 
                    ${showSidebar ? 'lg:px-[30px]' : 'lg:px-[25px]'}
                `}>
                <p className={`text-[#8B909A] text-[11px] font-[400] leading-[14px] md:text-center lg:text-left`}>
                    QUẢN LÝ SẢN PHẨM
                </p>
            </div>
            <SidebarList showSidebar={showSidebar} />
        </div>
    );
};

export default Sidebar;