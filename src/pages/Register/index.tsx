import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full h-full flex items-center justify-center overflow-y-auto">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center justify-center gap-6">
                    <img src="../icons/ic-logo-login.svg" alt="logo" className="w-[108px] h-[60px]" />
                    <h1 className="text-[32px] font-[600] leading-[48px] text-[#1B1B33] select-none">Đăng ký</h1>
                </div>
                <form
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Tên người dùng</label>
                        <input
                            className={`py-[6px] px-5 w-[425px] flex items-center rounded-md outline-none input-shadow`}
                            placeholder="Nhập tên người dùng"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Email</label>
                        <input
                            className={`py-[6px] px-5 w-[425px] flex items-center rounded-md outline-none input-shadow`}
                            placeholder="Nhập email"
                            type="text"
                        />
                        {/* {errors.email && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.email.message}</span>} */}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Mật khẩu</label>
                        <div className={`py-[6px] px-5 w-[425px] flex items-center rounded-md gap-2 input-shadow`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full outline-none"
                                placeholder="••••••••••••••"
                            />
                            <img
                                src={showPassword ? "../icons/ic-eye-show.svg" : "../icons/ic-eye.svg"}
                                alt="eye"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Ngày sinh</label>
                        <input
                            className={`py-[6px] px-5 w-[425px] flex items-center rounded-md outline-none input-shadow`}
                            placeholder="Nhập ngày sinh"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Link avatar</label>
                        <input
                            className={`py-[6px] px-5 w-[425px] flex items-center rounded-md outline-none input-shadow`}
                            placeholder="Nhập link avatar"
                            type="text"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-[14px] px-[32px] text-[16px] font-[500] leading-5 text-[#fff] rounded-md bg-[#0F60FF] select-none">
                        Đăng ký
                    </button>
                </form>
                <div className="flex items-center justify-center gap-1">
                    <p className="text-[14px] font-[400] leading-5 text-[#5A5C6F]">Bạn đã có tài khoản?</p>
                    <Link to="/Register" className="text-[#0F60FF] text-[14px] font-[600] leading-[20px]">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;