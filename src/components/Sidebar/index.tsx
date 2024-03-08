import React from 'react';
import SidebarList from '../SidebarList';
import { useDispatch, useSelector } from 'react-redux';
import { showSidebarMobile } from './../../features/actions/showSidebar';
import { showSidebarDesktop } from '../../features/actions/showSiderBarDesktop';

const Sidebar = () => {

    const dispatch = useDispatch();

    const isShowSidebarDesktop = useSelector((state: any) => state.showSidebarDesktop)

    const isShowSidebarMobile = useSelector((state: any) => state.showSidebar)

    return (
        <>
            <div
                className={`lg:flex sm:hidden flex-col items-center bg-white 
                    ${isShowSidebarDesktop ? 'lg:min-w-[260px]' : 'lg:w-[80px]'}
                `}>
                {
                    isShowSidebarDesktop ? (
                        <div
                            className={`w-full py-[18px] pl-[18px] pr-[14px] flex items-center 
                            ${isShowSidebarDesktop ? 'justify-between' : 'justify-center'}
                        `}>
                            <img src='../icons/ic-logo.svg' alt='logo' className='' />
                            <img
                                onClick={() => dispatch(showSidebarDesktop(false))}
                                src='../icons/ic-indent-decrease.svg'
                                alt=''
                                className='w-6 h-7'
                            />

                        </div>
                    ) : (
                        <div className={`w-full py-[18px] pl-[18px] pr-[14px] flex items-center justify-center`}>
                            <img
                                onClick={() => dispatch(showSidebarDesktop(true))}
                                src='../icons/ic-indent-decrease-show.svg'
                                alt=''
                                className='w-6 h-7 opacity-70'
                            />

                        </div>
                    )
                }

                <div
                    className={`w-full flex items-center justify-start py-[15px] 
                        ${isShowSidebarDesktop ? 'lg:px-[30px]' : 'lg:px-[25px]'}
                    `}>
                    <p className={`text-[#8B909A] text-[11px] font-[400] public-sans leading-[14px] md:text-center select-none 
                    ${isShowSidebarDesktop ? 'lg:text-left' : 'font-[600] text-[#656970] lg:text-center'}`}>
                        QUẢN LÝ SẢN PHẨM
                    </p>
                </div>
                <SidebarList showSidebar={isShowSidebarDesktop} />
            </div>
            {
                isShowSidebarMobile && (
                    <>
                        <div onClick={() => dispatch(showSidebarMobile(false))} className='fixed top-0 bg-[#d5d5d5] opacity-50 right-0 left-0 bottom-0 z-20'></div>
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
                            <SidebarList showSidebar={isShowSidebarMobile} />
                        </div>

                    </>
                )
            }

        </>
    );
};

export default Sidebar;