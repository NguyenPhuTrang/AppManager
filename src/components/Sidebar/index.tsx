import React, { useState } from 'react';
import SidebarList from '../SidebarList';
import { useDispatch, useSelector } from 'react-redux';
import { showSidebarMobile } from './../../features/actions/showSidebar';

const Sidebar = () => {

    const dispatch = useDispatch();

    const [showSidebar, setShowSidebar] = useState(true);

    const isShowSidebarMobile = useSelector((state: any) => state.showSidebar)

    return (
        <>
            <div
                className={`lg:flex sm:hidden flex-col items-center bg-white 
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
                    <p className={`text-[#8B909A] text-[11px] font-[400] public-sans leading-[14px] md:text-center lg:text-left select-none 
                    ${showSidebar ? '' : 'font-[600] text-[#656970]'}`}>
                        QUẢN LÝ SẢN PHẨM
                    </p>
                </div>
                <SidebarList showSidebar={showSidebar} />
            </div>
            {
                isShowSidebarMobile && (
                    <div className={`lg:hidden flex flex-col items-center bg-white min-w-[260px] fixed top-0 left-0 bottom-0 z-30 animate-fade-right animate-once animate-duration-300`}>
                        <div
                            className={`w-full py-[18px] pl-[18px] pr-[14px] flex items-center justify-between`}>
                            <img src='../icons/ic-logo.svg' alt='logo' className='' />
                            <img
                                onClick={() => dispatch(showSidebarMobile(false))}
                                src='../icons/ic-close-toast.svg'
                                alt=''
                                className='w-4 h-4 cursor-pointer'
                            />
                        </div>

                        <div
                            className={`w-full flex items-center justify-start py-[15px] px-[30px]`}>
                            <p className={`text-[#8B909A] text-[11px] font-[400] public-sans leading-[14px] md:text-center text-left select-none`}>
                                QUẢN LÝ SẢN PHẨM
                            </p>
                        </div>
                        <SidebarList showSidebar={showSidebar} />
                    </div>
                )
            }

        </>
    );
};

export default Sidebar;