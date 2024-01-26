import React from 'react';
import Sidebar from '../../components/Sidebar';
import HeaderDashboard from '../../components/Header';

interface Props {
    children: React.ReactNode;
}
const LayoutDashboard: React.FC<Props> = ({ children }) => {
    const arrPages = [
        {
            id: 1,
            title: 'Danh sách sản phẩm',
            href: ['https://manager-app-rho.vercel.app/manager/product', 'http://localhost:3000/product']
        },
        {
            id: 2,
            title: 'Danh sách người dùng',
            href: ['https://manager-app-rho.vercel.app/manager/user', 'http://localhost:3000/user']
        },
    ];
    const currentPath = window.location.href;
    let pageTitle = '';
    const currentPage = arrPages.find(page => page.href.flatMap(url => url).includes(currentPath));

    if (currentPage) {
        pageTitle = currentPage.title;
    }
    return (
        <div className='w-full h-full flex justify-between bg-neutral-50'>
            <Sidebar />
            <div className='flex-1 flex flex-col px-[26px] pt-2 justify-center items-center'>
                <HeaderDashboard title={pageTitle} />
                <div className='w-full h-full overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;