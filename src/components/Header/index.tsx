import React from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../../features/actions/active';
import InFoAdmin from '../InfoAdmin';
import Search from '../Search';
import { setIsCreatOrUpdate } from '../../features/actions/isCreateOrUpdate';

interface Props {
    title: string;
}

const HeaderDashboard = ({ title }: Props) => {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(increment(true));
        dispatch(setIsCreatOrUpdate('create'));
    }
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-between py-3'>
                <h2 className='text-[24px] font-[600] leading-[22px] text-[#23272E] select-none'>{title}</h2>
                <InFoAdmin />
            </div>
            <div className="pt-[36px] pb-[17px] flex items-center justify-between">
                <Search />
                <button
                    onClick={handleOpenModal}
                    type="button"
                    className="px-6 py-3 rounded-[6px] bg-[#0F60FF] flex items-center gap-[6px]"
                >
                    <img src="../icons/ic-add_plus.svg" alt="Add Icon" />
                    <p className="text-[14px] font-[600] leading-4 text-[#fff]">Tạo mới</p>
                </button>
            </div>
        </div>
    );
};

export default HeaderDashboard;
