import React from 'react';
import LayoutDashboard from '../LayoutDashboard';
import Navigation from "../../components/Navigation";
import Modal from "../../components/Modal";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment } from '../../actions/active';
import { users } from '../../data';
import { RootState } from '../../types';


const UserPage = () => {
    const active = useSelector((state: RootState) => state.active);
    const dispatch = useDispatch();
    return (
        <LayoutDashboard>
            <div className="w-full flex flex-col bg-white rounded-[16px] pt-2 shadow-[0px_4px_10px_#00000014]">
                <table className="min-w-full divide-y divide-[#E9E7FD] pl-[16px] pr-[24px]">
                    <thead>
                        <tr>
                            <th className="py-4 pr-5 pl-9 text-left text-[13px] select-none text-[#8B909A] font-[500]">AVATAR</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">TÊN NGƯỜI DÙNG</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">EMAIL</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">NGÀY SINH</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">SỐ ĐIỆN THOẠI</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E7FD]">
                        {users.map((user) => (
                            <tr key={user.name} className="py-">
                                <td className="py-4 pr-5 pl-9 select-none w-9 h-9 rounded-[2px]">
                                    <img src={user.avatar} alt="" />
                                </td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[600]">{user.name}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{user.email}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{user.birthday}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400] w-[313px]">{user.numberPhone}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">
                                    <div className="w-full h-full flex gap-[10px] items-center">
                                        <img src="../icons/ic-edit.svg" className="w-6 h-6 cursor-pointer" alt="" />
                                        <img src="../icons/ic-trash.svg" className="w-6 h-6 cursor-pointer" alt="" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Navigation />
            </div>
            {
                active && (
                    <Modal title={'Tạo mới người dùng'}>
                        <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                            <form className="w-full flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Tên người dùng
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập tên người dùng" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Email
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập email" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Ngày sinh
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input type="date" className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="YYYY/MM/DD" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Số điện thoại
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập số điện thoại" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Avatar
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập link ảnh avatar" />
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                            <button
                                onClick={() => dispatch(increment(true))}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 shadow">
                                Hủy
                            </button>
                            <button className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#0F60FF]">
                                Tạo mới
                            </button>
                        </div>
                    </Modal>
                )
            }
        </LayoutDashboard>
    );
};

export default UserPage;