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
            href: ['https://manager-app-rho.vercel.app/product', 'http://localhost:3000/product', 'http://localhost:3001/product']
        },
        {
            id: 2,
            title: 'Danh sách người dùng',
            href: ['https://manager-app-rho.vercel.app/user', 'http://localhost:3000/user', 'http://localhost:3001/user']
        },
        {
            id: 3,
            title: 'Thông tin người dùng',
            href: ['https://manager-app-rho.vercel.app/setting', 'http://localhost:3000/setting', 'http://localhost:3001/setting']
        }
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
            <div className='flex-1 flex flex-col pt-2 justify-center items-center'>
                <HeaderDashboard title={pageTitle} />
                <div className='w-full h-full overflow-hidden pb-[26px] px-[26px]'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;