import React, { useEffect, useState } from 'react';
import LayoutDashboard from '../../layouts/LayoutDashboard';
import Navigation from "../../components/Navigation";
import Modal from "../../components/Modal";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment } from '../../features/actions/active';
import * as UserApi from '../../hooks'
import { RootState } from '../../common/interfaces';
import { User } from '../../types';
import { AxiosResponse } from 'axios';
import { totalPage, totalData } from '../../features/actions/page';
import { useDeleteUsers, useCreateUsers } from '../../hooks';
import { setIsCreatOrUpdate } from '../../features/actions/isCreateOrUpdate';
import Loading from '../../components/Loading';

const UserPage = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState<User[]>([])
    const [showModalDelele, setShowModalDelele] = useState(false);
    const active = useSelector((state: RootState) => state.active);
    const isCreateOrUpdate = useSelector((state: RootState) => state.isCreateOrUpdate);
    const page = useSelector((state: RootState) => state.page);
    const keyword = useSelector((state: RootState) => state.keyword);
    const totalPages = Math.ceil(page.totalData / page.limit);

    const {
        reset,
        register,
        handleSubmit,
        useOnSubmitCreate,
        useOnSubmitUpdate,
        resetForm,
        selectUserForUpdate,
        selectedUser,
        errors,
        isCreate,
        isUpdate,

    } = useCreateUsers();
    const { handleDeleteUser, isDeleted } = useDeleteUsers();
    const [idDeleteUser, setIdDeleteUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (selectedUser !== null) {
            reset(selectedUser);
        } else {
            reset({
                name: "",
                email: "",
                numberPhone: "",
                birthday: "",
                avatarUrl: "",
            });
        }

        const fetchUsers = async () => {
            try {
                let queryParams: {
                    page: number;
                    limit: number;
                    keyword?: string;
                } = {
                    page: page.number,
                    limit: page.limit
                };

                if (keyword) {
                    queryParams.keyword = keyword;
                }
                const response: AxiosResponse<any> = await UserApi.getAllUsers(queryParams);

                setUsers(response.data.items);
                dispatch(totalData(response.data.totalItems));
                const totalPages = Math.ceil(response.data.totalItems / page.limit);
                dispatch(totalPage(totalPages > 0 ? totalPages : 1));
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchUsers();
    }, [reset, selectedUser, isDeleted, isCreate, isUpdate, page.limit, page.number, totalPages, dispatch, keyword])

    const handleClickUpdate = (user: User) => {
        selectUserForUpdate(user);
        dispatch(increment(true));
        dispatch(setIsCreatOrUpdate('update'));
    }

    const handleCancel = () => {
        resetForm();
        dispatch(increment(true));
    };

    const handleShowModalDelete = (id: any) => {
        setIdDeleteUser(id);
        setShowModalDelele(true);
    }

    const handleSubmitDelete = () => {
        handleDeleteUser(idDeleteUser);
        setShowModalDelele(false);
        setIdDeleteUser(null);
    }
    const [date, setDate] = useState('');
    const handleDateChange = (e: any) => {
        let input = e.target.value.replace(/\D/g, '').substring(0, 8);
        let dateFormat = input.match(/^(\d{4})(\d{0,2})(\d{0,2})$/);

        if (dateFormat) {
            let formattedDate = dateFormat[1];
            if (dateFormat[2]) formattedDate += '/' + dateFormat[2];
            if (dateFormat[3]) formattedDate += '/' + dateFormat[3];
            setDate(formattedDate);
        } else {
            setDate(input);
        }
        register('birthday', e);
    };

    return (
        <LayoutDashboard>
            <div className="w-full flex flex-col bg-white rounded-[16px] pt-2">
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
                    {
                        loading ? (
                            <Loading />
                        ) : (
                            <tbody className="divide-y divide-[#E9E7FD]">
                                {users.length === 0 ? (
                                    <tr>
                                        <td className="py-4 pr-5 pl-9 text-[15px] text-[#23272E] select-none font-[600]">Không có người dùng nào.</td>
                                    </tr>
                                ) : (users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="py-4 pr-5 pl-9 w-9 select-none">
                                            <img src={user.avatarUrl} alt="avatar" className='w-9 h-9 rounded-[2px]' />
                                        </td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[600]">{user.name}</td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{user.email}</td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{user.birthday}</td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{user.numberPhone}</td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">
                                            <div className="w-full h-full flex gap-[10px] items-center">
                                                <img
                                                    src="../icons/ic-edit.svg"
                                                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                                                    alt=""
                                                    onClick={() => handleClickUpdate(user)}
                                                />
                                                <img
                                                    src="../icons/ic-trash.svg"
                                                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                                                    alt=""
                                                    onClick={() => handleShowModalDelete(user.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                )}
                            </tbody>
                        )
                    }
                </table>
                <Navigation />
            </div>

            {
                showModalDelele && (
                    <Modal title={'Xóa người dùng'}>
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all px-6 pb-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <p className="text-sm text-red-600">Bạn muốn người dùng này?</p>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    onClick={handleSubmitDelete}
                                >
                                    Xóa
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setShowModalDelele(false)}
                                >
                                    Hủy
                                </button>

                            </div>
                        </div>
                    </Modal>
                )
            }

            {
                active && isCreateOrUpdate === 'create' && (
                    <Modal title={'Tạo mới người dùng'}>
                        <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                            <form className="w-full flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Tên người dùng
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.name ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập tên người dùng"
                                        type="text"
                                        {...register('name')}
                                    />
                                    {errors.name && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.name.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Email
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.email ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập email"
                                        type="text"
                                        {...register('email')}
                                    />
                                    {errors.email && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.email.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Ngày sinh
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.birthday ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="YYYY/MM/DD"
                                        type="text"
                                        value={date}
                                        {...register('birthday', {
                                            onChange: (e) => {
                                                handleDateChange(e);
                                            }
                                        })}
                                    />
                                    {errors.birthday && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.birthday.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Số điện thoại
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.numberPhone ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập số điện thoại"
                                        type='text'
                                        {...register('numberPhone')}
                                    />
                                    {errors.numberPhone && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.numberPhone.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Avatar
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.avatarUrl ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập link ảnh avatar"
                                        type='text'
                                        {...register('avatarUrl')}
                                    />
                                    {errors.avatarUrl && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.avatarUrl.message}</span>}
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                            <button
                                onClick={handleCancel}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 shadow">
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit(useOnSubmitCreate)}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#0F60FF]"
                            >
                                Tạo mới
                            </button>
                        </div>
                    </Modal>
                )
            }
            {
                active && isCreateOrUpdate === 'update' && selectedUser && (
                    <Modal title={'Cập nhật người dùng'}>
                        <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                            <form className="w-full flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Tên người dùng
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.name ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập tên người dùng"
                                        defaultValue={selectedUser.name}
                                        {...register('name')}
                                    />
                                    {errors.name && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.name.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Email
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.email ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập email"
                                        defaultValue={selectedUser.email}
                                        {...register('email')}
                                    />
                                    {errors.email && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.email.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Ngày sinh
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.birthday ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="YYYY/MM/DD"
                                        defaultValue={selectedUser.birthday}
                                        {...register('birthday', {
                                            onChange: (e) => {
                                                handleDateChange(e);
                                            }
                                        })}
                                    />
                                    {errors.birthday && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.birthday.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Số điện thoại
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.numberPhone ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập số điện thoại"
                                        defaultValue={selectedUser.numberPhone}
                                        {...register('numberPhone')}
                                    />
                                    {errors.numberPhone && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.numberPhone.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Avatar
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.avatarUrl ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập link ảnh avatar"
                                        defaultValue={selectedUser.avatarUrl}
                                        {...register('avatarUrl')}
                                    />
                                    {errors.avatarUrl && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.avatarUrl.message}</span>}
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                            <button
                                onClick={handleCancel}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 shadow">
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit(useOnSubmitUpdate)}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#0F60FF]">
                                Cập nhật
                            </button>
                        </div>
                    </Modal>
                )
            }
        </LayoutDashboard>
    );
};

export default UserPage;