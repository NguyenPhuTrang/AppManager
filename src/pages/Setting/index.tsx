import React, { useEffect } from 'react';
import LayoutDashboard from '../../layouts/LayoutDashboard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/interfaces';
import { useProfileForm } from '../../features/auth/forms/profile-form';

const SettingPage = () => {
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const { register, handleSubmit, errors, onSubmit, setValue } = useProfileForm();
    useEffect(() => {
        setValue("name", userProfile.name)
        setValue("email", userProfile.email)
        setValue("birthday", userProfile.birthday)
        setValue("numberPhone", userProfile.numberPhone)
        setValue("avatarUrl", userProfile.avatarUrl)
    }, [userProfile, setValue]);
    return (
        <LayoutDashboard>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full h-full bg-white rounded-[16px] p-[26px] overflow-y-auto'
            >
                <div className="space-y-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-8 md:grid-cols-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900 select-none">Hồ sơ người dùng</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600 select-none">
                                Thông tin này sẽ được hiển thị công khai vì vậy hãy cẩn thận với những gì bạn chia sẻ.
                            </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 md:col-span-2">
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900 select-none">
                                    Tên người dùng
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input
                                        type="text"
                                        defaultValue={userProfile.name}
                                        className="block px-4 outline-none flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Nhập tên người dùng"
                                        {...register('name')}
                                    />
                                </div>
                                {errors.name && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.name.message}</span>}
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900 select-none">
                                    Ngày sinh
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input
                                        type="text"
                                        defaultValue={userProfile.birthday}
                                        className="block px-4 outline-none flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="YYYY/MM/DD"
                                        {...register('birthday')}
                                    />
                                </div>
                                {errors.birthday && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.birthday.message}</span>}
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900 select-none">
                                    Số điện thoại
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input
                                        type="text"
                                        defaultValue={userProfile.numberPhone}
                                        className="block px-4 outline-none flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Nhập số điện thoại"
                                        {...register('numberPhone')}
                                    />
                                </div>
                                {errors.numberPhone && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.numberPhone.message}</span>}
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900 select-none">
                                    Avatar
                                </label>
                                <div className='flex items-center gap-4'>
                                    <img src={userProfile.avatarUrl} alt="avatar" className='h-20 w-20 rounded-full' />
                                    <div className="mt-1 flex flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                        <textarea
                                            rows={3}
                                            defaultValue={userProfile.avatarUrl}
                                            className="block px-4 outline-none flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Nhập link ảnh avatar"
                                            {...register('avatarUrl')}
                                        />
                                    </div>

                                </div>
                                {errors.avatarUrl && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.avatarUrl.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 pr-2">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        <Link to='/product'>
                            Thoát
                        </Link>
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-[#0F60FF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </LayoutDashboard>
    );
};

export default SettingPage;