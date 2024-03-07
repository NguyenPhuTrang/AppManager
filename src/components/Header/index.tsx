import React from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../../features/actions/active';
import InFoAdmin from '../InfoAdmin';
import Search from '../Search';
import { setIsCreatOrUpdate } from '../../features/actions/isCreateOrUpdate';
import {
    Bars3Icon,
} from '@heroicons/react/24/outline'
import { showSidebarMobile } from '../../features/actions/showSidebar';

interface Props {
    title: string;
}

const HeaderDashboard = ({ title }: Props) => {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(increment(true));
        dispatch(setIsCreatOrUpdate('create'));
    }

    const handleShowSidebar = () => {
        dispatch(showSidebarMobile(true));
    }
    return (
        <div className='w-full px-[26px]'>
            <div className='w-full flex items-center justify-between'>
                <div className='lg:hidden sm:flex items-center justify-center mr-4'>
                    <Bars3Icon onClick={handleShowSidebar} className="h-6 w-6 cursor-pointer" aria-hidden="true" />
                </div>
                <div className='flex flex-1 items-center justify-between py-3'>
                    <h2 className='text-[24px] font-[600] leading-[22px] text-[#23272E] public-sans select-none'>{title}</h2>
                    <InFoAdmin />
                </div>
            </div>
            <div className="pt-[36px] pb-[17px] flex items-center justify-between">
                <Search />
                <button
                    onClick={handleOpenModal}
                    type="button"
                    className="px-6 py-3 rounded-[6px] bg-[#0F60FF] flex items-center gap-[6px] hover:bg-indigo-500"
                >
                    <img src="../icons/ic-add_plus.svg" alt="Add Icon" />
                    <p className="text-[14px] font-[600] leading-4 text-[#fff]">Tạo mới</p>
                </button>
            </div>
        </div>
    );
};

export default HeaderDashboard;
