import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showSidebarMobile } from '../../features/actions/showSidebar';

interface Props {
    showSidebar: boolean;
}

const SidebarList = ({
    showSidebar,
}: Props) => {

    const dispatch = useDispatch();

    const ArraySidebar = [
        {
            id: 1,
            title: 'Sản phẩm',
            icon: '../icons/ic-box.svg',
            href: '/product'
        },
        {
            id: 2,
            title: 'Users',
            icon: '../icons/ic-user.svg',
            href: '/user'
        },
    ]
    const currentUrl = window.location.pathname;

    return (
        <div className='w-full flex flex-col gap-2 px-[14px]'>
            {ArraySidebar.map((item) => {
                return (
                    <Link to={item.href}
                        key={item.id}
                        onClick={() => dispatch(showSidebarMobile(false))}
                        className={`w-full flex items-center py-[9px] px-[16px] gap-2 rounded-[6px] 
                        ${item.href === currentUrl ? 'bg-[#F3F4F8]' : ''}`}

                    >
                        <img
                            src={item.icon}
                            alt='icon' className={`${item.href === currentUrl ? '' : 'opacity-40'} w-[22px] h-[22px]`} />
                        {
                            showSidebar ?
                                (
                                    <p
                                        className={`${item.href === currentUrl ? 'text-[#23272E]' : 'text-[#8B909A]'} 
                                        text-[15px] font-[600] leading-[22px] public-sans
                                    `}>
                                        {item.title}
                                    </p>)
                                : (
                                    <p
                                        className={`${item.href === currentUrl ? 'text-[#23272E]' : 'text-[#8B909A]'} 
                                        text-[15px] font-[600] leading-[22px] public-sans lg:hidden md:block
                                    `}>
                                        {item.title}
                                    </p>
                                )
                        }
                    </Link>
                )
            })}
        </div>
    );
};

export default SidebarList;