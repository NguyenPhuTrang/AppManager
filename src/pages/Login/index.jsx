import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useLoginForm } from '../../features/auth/forms/login-form';

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const schema = yup.object().shape({
        email: yup.string().email("Email không đúng định dạng").required("Email là trường bắt buộc"),
        password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(20, 'Mật khẩu không được quá 20 ký tự').required("Mật khẩu là trường bắt buộc")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { loginRegister, loginHandleSubmit, loginErrors } = useLoginForm();

    const onSubmit = (data) => {
        
        console.log(data);
        // try {
        //     axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
        //         .then(response => {
        //             console.log(response.data);
        //         })
        //         .catch(error => {
        //             console.error('Error:', error);
        //         });
        // } catch (error) {
        //     console.error('Error:', error);
        // }
        loginHandleSubmit(data);
    };



    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center justify-center gap-6">
                    <img src="../icons/ic-logo-login.svg" alt="logo" className="w-[108px] h-[60px]" />
                    <h1 className="text-[32px] font-[600] leading-[48px] text-[#1B1B33] select-none">Đăng nhập</h1>
                </div>
                <form
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Email</label>
                        <input
                            className={`py-[6px] px-5 w-[425px] flex items-center rounded-md outline-none ${errors.email ? 'input-shadow-error' : 'input-shadow'} `}
                            placeholder="Nhập email"
                            type="text"
                            {...register('email')}
                        />
                        {errors.email && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#464F60] text-[14px] font-[500] leading-[20px] select-none">Mật khẩu</label>
                        <div className={`py-[6px] px-5 w-[425px] flex items-center rounded-md gap-2 ${errors.password ? 'input-shadow-error' : 'input-shadow'}`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full outline-none"
                                placeholder="••••••••••••••"
                                {...register('password')}
                            />
                            <img
                                src={showPassword ? "../icons/ic-eye-show.svg" : "../icons/ic-eye.svg"}
                                alt="eye"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.password.message}</span>}
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