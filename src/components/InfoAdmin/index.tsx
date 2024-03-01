import React, { useEffect, useState } from 'react';
import { logout } from '../../plugins/axios';
import Modal from '../Modal';
import { RootState } from '../../common/interfaces';
import { useSelector } from 'react-redux';
import { useUserStore } from '../../features/auth/stores';
import { Link } from 'react-router-dom';

const InFoAdmin = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const handleLogout = () => {
        setIsShowModal(false);
        logout(true);
    }
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const { getUserProfile } = useUserStore();
    useEffect(() => {
        getUserProfile();
    }, []);
    return (
        <div className='flex items-center justify-between'>
            <div className='relative mr-5'>
                <img src='../icons/ic-bell.svg' alt='bell' />
                <div className='absolute top-[-5px] right-[-5px] w-[18px] h-[18px] bg-[#EA5455] rounded-full flex items-center justify-center'>
                    <p className='text-white select-none'>4</p>
                </div>
            </div>
            <div className='flex items-center justify-center w-[38px] h-[38px] relative group'>
                <img src={userProfile.avatarUrl} className='rounded-full cursor-pointer w-full h-full' alt='avatar' />
                <span className='p-[2px] rounded-full bg-[#fff] flex items-center justify-center absolute bottom-0 right-0'>
                    <span className='w-2 h-2 rounded-full bg-[#28C76F]'></span>
                </span>
                <div className='
                    w-[120px] md:w-[150px] lg:w-[200px] absolute bg-white top-[100%] right-0 
                    rounded-md shadow-md animate-flip-down animate-once animate-ease-out group-hover:block hidden'>
                    <div className="px-4 py-3" role="none">
                        <p className="text-sm" role="none">Đăng nhập bởi</p>
                        <p className="truncate text-sm font-medium text-gray-900" role="none">{userProfile.email}</p>
                    </div>
                    <hr />
                    <ul className="w-full">
                        <li className="text-gray-700 cursor-pointer hover:bg-slate-100 px-4 py-3 flex items-center justify-between text-sm select-none">
                            <Link to="/setting" className='w-full h-full'>Cài đặt</Link>
                        </li>
                        <li className="text-gray-700 cursor-pointer hover:bg-slate-100 px-4 py-3 flex items-center justify-between text-sm select-none">Hỗ trợ</li>
                        <li
                            className="text-gray-700 cursor-pointer hover:bg-slate-100 px-4 py-3 flex items-center justify-between text-sm select-none"
                            onClick={() => setIsShowModal(true)}
                        >
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>
            {
                isShowModal && (
                    <Modal title='Bạn muốn đăng xuất?'>
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all px-6 pb-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <p className="text-sm text-red-600">Bạn muốn đăng xuất?</p>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setIsShowModal(false)}
                                >
                                    Hủy
                                </button>

                            </div>
                        </div>
                    </Modal>
                )
            }
        </div>
    );
};

export default InFoAdmin;