import React from 'react';

const SidebarList = () => {
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
                    <a href={item.href} key={item.id} className={`w-full lg:flex lg:items-center py-[9px] px-[16px] gap-2 rounded-[6px] ${item.href === currentUrl ? 'bg-[#F3F4F8]' : ''}`}>
                        <img src={item.icon} alt='icon' className={`${item.href === currentUrl ? '' : 'opacity-40'} w-[22px] h-[22px]`}/>
                        <p className={`${item.href === currentUrl ? 'text-[#23272E]' : 'text-[#8B909A]'} text-[15px] font-[600] leading-[22px] md:hidden lg:block`}>
                            {item.title}
                        </p>
                    </a>
                )
            })}
        </div>
    );
};

export default SidebarList;