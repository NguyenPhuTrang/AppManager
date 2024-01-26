import React from 'react';

const LoginPage = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center justify-center gap-6">
                    <img src="../icons/ic-logo-login.svg" alt="logo" className="w-[108px] h-[60px]" />
                    <h1 className="text-[32px] font-[600] leading-[48px] text-[#1B1B33] select-none">Đăng nhập</h1>
                </div>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Email</label>
                        <input type="email" className="py-[6px] px-5 w-[425px] flex items-center rounded-md input-shadow outline-none" placeholder="Nhập email" />
                        <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">Email không hợp lệ</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Mật khẩu</label>
                        <div className="py-[6px] px-5 w-[425px] flex items-center rounded-md input-shadow gap-2">
                            <input type="password" className="w-full outline-none" placeholder="••••••••••••••" />
                            <img src="../icons/ic-eye.svg" alt="eye" />
                        </div>
                        <span className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Mật khẩu không hợp lệ</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="input-shadow w-4 h-4" />
                            <span className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Ghi nhớ Đăng nhập</span>
                        </div>
                        <a href="#" className="text-[#0F60FF] text-[14px] font-[500] leading-[20px] select-none">Quên mật khẩu?</a>
                    </div>
                    <button
                        type="submit"
                        className="py-[14px] px-[32px] text-[16px] font-[500] leading-5 text-[#fff] rounded-md bg-[#0F60FF] select-none">
                        Đăng nhập
                    </button>
                </form>
                <div className="flex items-center justify-center gap-1">
                    <p className="text-[14px] font-[400] leading-5 text-[#5A5C6F]">Bạn chưa có tài khoản?</p>
                    <a href="#" className="text-[#0F60FF] text-[14px] font-[600] leading-[20px]">Đăng ký</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;