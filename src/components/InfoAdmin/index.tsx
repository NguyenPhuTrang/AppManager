import React, { useEffect, useRef, useState } from 'react';
import { logout } from '../../plugins/axios';
import Modal from '../Modal';
import { RootState } from '../../common/interfaces';
import { useSelector } from 'react-redux';
import { useUserStore } from '../../features/auth/stores';
import { Link } from 'react-router-dom';

const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const InFoAdmin = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const { getUserProfile } = useUserStore();

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsShowModal(false);
        logout(true);
    };

    return (
        <div className="flex items-center justify-between">
            {/* Bell */}
            <div className="relative mr-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#f0d0da]
                    text-[#d46080] bg-white hover:bg-[#fce8ee] hover:border-[#e87aab]
                    transition-all duration-150 cursor-pointer shadow-[0_1px_4px_rgba(200,120,140,0.08)]">
                    <BellIcon />
                </div>
                <div className="absolute top-[-5px] right-[-5px] w-[18px] h-[18px] bg-[#EA5455] rounded-full flex items-center justify-center">
                    <p className="text-white text-[10px] font-semibold select-none">4</p>
                </div>
            </div>

            {/* Avatar + Dropdown */}
            <div ref={dropdownRef} className="flex items-center justify-center w-[38px] h-[38px] relative">
                <div
                    className="w-full h-full rounded-full border-2 border-[#f0d0da] overflow-hidden cursor-pointer hover:border-[#e87aab] transition-all duration-150"
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                >
                    <img
                        src={userProfile.avatarUrl}
                        className="rounded-full cursor-pointer w-full h-full object-cover"
                        alt="avatar"
                    />
                </div>
                <span className="p-[2px] rounded-full bg-white flex items-center justify-center absolute bottom-0 right-0">
                    <span className="w-2 h-2 rounded-full bg-[#28C76F]"></span>
                </span>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <div className="
                        w-[160px] md:w-[180px] lg:w-[200px] absolute bg-white top-[100%] right-0 mt-2
                        rounded-xl border border-[#fce8ee] shadow-[0_8px_24px_rgba(200,120,140,0.15)]
                        animate-flip-down animate-once animate-ease-out z-50 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-[#fce8ee]" role="none">
                            <p className="text-[12px] text-[#c0a0ac]" role="none">Đăng nhập bởi</p>
                            <p className="truncate text-[12px] font-medium text-gray-900" role="none">{userProfile.email}</p>
                        </div>
                        <ul className="w-full py-1">
                            <li className="text-[13px] text-[#5a3045] cursor-pointer hover:bg-[#fce8ee] transition-colors select-none">
                                <Link
                                    to="/setting"
                                    className="w-full h-full px-4 py-2.5 flex items-center"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Cài đặt
                                </Link>
                            </li>
                            <li className="text-[13px] text-[#5a3045] cursor-pointer hover:bg-[#fce8ee] px-4 py-2.5 transition-colors select-none">
                                Hỗ trợ
                            </li>
                            <li
                                className="flex items-center gap-2 text-[13px] text-[#e06080] cursor-pointer hover:bg-[#fce8ee] px-4 py-2.5 transition-colors select-none border-t border-[#fce8ee]"
                                onClick={() => { setIsDropdownOpen(false); setIsShowModal(true); }}
                            >
                                <LogoutIcon />
                                Đăng xuất
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Modal logout */}
            {isShowModal && (
                <Modal title="Bạn muốn đăng xuất?">
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
            )}
        </div>
    );
};

export default InFoAdmin;