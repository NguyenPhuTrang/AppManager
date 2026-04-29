import React, { useEffect, useState } from 'react';
import LayoutDashboard from '../../layouts/LayoutDashboard';
import Navigation from "../../components/Navigation";
import Modal from "../../components/Modal";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment } from '../../features/actions/active';
import { RootState } from '../../common/interfaces';
import { AxiosResponse } from 'axios';
import { totalPage, totalData } from '../../features/actions/page';
import { setIsCreatOrUpdate } from '../../features/actions/isCreateOrUpdate';
import Loading from '../../components/Loading';
import ModalDelete from '../../components/ModalDelete';
import { categoryApi } from '../../services/category.service';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HttpStatus } from '../../common/constants';
import { useNotification } from '../../common/helpers';

interface ICategory {
    id: string;
    _id: string;
    title: string;
    icon: string;
    sortOrder: number;
    isActive: boolean;
}

interface CategoryForm {
    title: string;
    icon?: string;
    sortOrder?: number;
    isActive?: boolean;
}

const CategoryPage = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idDeleteCategory, setIdDeleteCategory] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [loading, setLoading] = useState(true);

    const active = useSelector((state: RootState) => state.active);
    const isCreateOrUpdate = useSelector((state: RootState) => state.isCreateOrUpdate);
    const page = useSelector((state: RootState) => state.page);
    const keyword = useSelector((state: RootState) => state.keyword);
    const totalPages = Math.ceil(page.totalData / page.limit);
    const { showSuccessNotification, showErrorNotification } = useNotification();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryForm>();

    useEffect(() => {
        if (selectedCategory) {
            reset({
                title: selectedCategory.title,
                icon: selectedCategory.icon,
                sortOrder: selectedCategory.sortOrder,
                isActive: selectedCategory.isActive,
            });
        } else {
            reset({ title: '', icon: '', sortOrder: 0, isActive: true });
        }

        const fetchCategories = async () => {
            try {
                const queryParams: any = {
                    page: page.number,
                    limit: page.limit,
                };
                if (keyword) queryParams.keyword = keyword;

                const response: AxiosResponse<any> = await categoryApi.getAll(queryParams);
                setCategories(response.data?.items || []);
                dispatch(totalData(response.data?.totalItems || 0));
                dispatch(totalPage(Math.ceil((response.data?.totalItems || 0) / page.limit)));
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [reset, selectedCategory, isDeleted, isCreate, isUpdate, page.limit, page.number, totalPages, dispatch, keyword]);

    const closeModal = () => {
        reset();
        setSelectedCategory(null);
        dispatch(increment(true));
    };

    const onSubmitCreate: SubmitHandler<CategoryForm> = async (data) => {
        try {
            const res: any = await categoryApi._create(data);
            if (res.code === HttpStatus.BAD_REQUEST) {
                showErrorNotification('Thêm thất bại', 'Category này đã tồn tại');
                return;
            }
            if (res.success) {
                closeModal();
                setIsCreate(!isCreate);
                showSuccessNotification('Thêm thành công', 'Thêm category thành công');
            }
        } catch (error) {
            showErrorNotification('Thêm thất bại', 'Thêm category thất bại');
        }
    };

    const onSubmitUpdate: SubmitHandler<CategoryForm> = async (data) => {
        if (!selectedCategory) return;
        try {
            const res: any = await categoryApi._update(selectedCategory.id || selectedCategory._id, data);
            if (res.code === HttpStatus.BAD_REQUEST) {
                showErrorNotification('Cập nhật thất bại', 'Category này đã tồn tại');
                return;
            }
            if (res.success) {
                closeModal();
                setIsUpdate(!isUpdate);
                showSuccessNotification('Cập nhật thành công', 'Cập nhật category thành công');
            }
        } catch (error) {
            showErrorNotification('Cập nhật thất bại', 'Cập nhật category thất bại');
        }
    };

    const handleClickUpdate = (category: ICategory) => {
        setSelectedCategory(category);
        dispatch(increment(true));
        dispatch(setIsCreatOrUpdate('update'));
    };

    const handleCancel = () => {
        reset();
        setSelectedCategory(null);
        dispatch(increment(true));
    };

    const handleShowModalDelete = (id: string) => {
        setIdDeleteCategory(id);
        setShowModalDelete(true);
    };

    const handleSubmitDelete = async () => {
        try {
            const res: any = await categoryApi._delete(idDeleteCategory!);
            if (res.success) {
                showSuccessNotification('Xóa thành công', 'Xóa category thành công');
                setIsDeleted(!isDeleted);
            }
        } catch (error) {
            showErrorNotification('Xóa thất bại', 'Xóa category thất bại');
        } finally {
            setShowModalDelete(false);
            setIdDeleteCategory(null);
        }
    };

    return (
        <LayoutDashboard>
            <div className="w-full h-full flex flex-col bg-white rounded-[16px] pt-2 pb-[21px] overflow-y-auto table-shadow">
                <table className="min-w-full divide-y divide-[#E9E7FD] pl-[16px] pr-[24px]">
                    <thead>
                        <tr>
                            <th className="py-4 pr-5 pl-9 text-left text-[13px] select-none text-[#8B909A] font-[500]">ICON</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">TITLE</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">SORT ORDER</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">STATUS</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">ACTION</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <Loading />
                    ) : (
                        <tbody className="divide-y divide-[#E9E7FD]">
                            {categories.length === 0 ? (
                                <tr>
                                    <td className="py-4 pr-5 pl-9 text-[15px] text-[#23272E] select-none font-[600]">No categories found.</td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id || category._id}>
                                        <td className="py-4 pr-5 pl-9">
                                            {category.icon ? (
                                                <img
                                                    src={category.icon?.startsWith('./') ? category.icon.replace('./', '/') : category.icon}
                                                    alt={category.title}
                                                    className="w-6 h-6"
                                                />
                                            ) : (
                                                <span className="text-[#8B909A] text-[13px]">—</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[600] public-sans">{category.title}</td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{category.sortOrder}</td>
                                        <td className="py-4 px-5">
                                            <span className={`px-2.5 py-1 rounded-lg text-[12px] font-[500]
                                                ${category.isActive
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-red-50 text-red-500'
                                                }`}>
                                                {category.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">
                                            <div className="w-full h-full flex gap-[10px] items-center">
                                                <img
                                                    src="../icons/ic-edit.svg"
                                                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                                                    alt=""
                                                    onClick={() => handleClickUpdate(category)}
                                                />
                                                <img
                                                    src="../icons/ic-trash.svg"
                                                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                                                    alt=""
                                                    onClick={() => handleShowModalDelete(category.id || category._id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    )}
                </table>
                <Navigation />
            </div>

            {showModalDelete && (
                <ModalDelete
                    title="Confirm Delete"
                    description="Are you sure you want to delete this category?"
                    handleSubmit={handleSubmitDelete}
                    handleClose={() => setShowModalDelete(false)}
                />
            )}

            {active && isCreateOrUpdate === 'create' && (
                <Modal title={'Create Category'}>
                    <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                        <form className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Title
                                    <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                </label>
                                <input
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.title ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter category title"
                                    type="text"
                                    {...register('title', { required: 'Title is required' })}
                                />
                                {errors.title && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.title.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Icon URL</label>
                                <input
                                    className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none input-shadow"
                                    placeholder="Enter icon URL"
                                    type="text"
                                    {...register('icon')}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Sort Order</label>
                                <input
                                    className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none input-shadow"
                                    placeholder="Enter sort order"
                                    type="number"
                                    {...register('sortOrder', { valueAsNumber: true })}
                                />
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    className="w-4 h-4 accent-[#0F60FF] cursor-pointer"
                                    {...register('isActive')}
                                    defaultChecked
                                />
                                <label htmlFor="isActive" className="text-[14px] font-[500] leading-5 text-[#464F60] cursor-pointer">
                                    Active
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                        <button
                            onClick={handleCancel}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 button_cancel-shadow">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onSubmitCreate)}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#0F60FF]">
                            Create
                        </button>
                    </div>
                </Modal>
            )}

            {active && isCreateOrUpdate === 'update' && selectedCategory && (
                <Modal title={'Update Category'}>
                    <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                        <form className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Title
                                    <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                </label>
                                <input
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.title ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter category title"
                                    type="text"
                                    defaultValue={selectedCategory.title}
                                    {...register('title', { required: 'Title is required' })}
                                />
                                {errors.title && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.title.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Icon URL</label>
                                <input
                                    className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none input-shadow"
                                    placeholder="Enter icon URL"
                                    type="text"
                                    defaultValue={selectedCategory.icon}
                                    {...register('icon')}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Sort Order</label>
                                <input
                                    className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none input-shadow"
                                    placeholder="Enter sort order"
                                    type="number"
                                    defaultValue={selectedCategory.sortOrder}
                                    {...register('sortOrder', { valueAsNumber: true })}
                                />
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActiveUpdate"
                                    className="w-4 h-4 accent-[#0F60FF] cursor-pointer"
                                    defaultChecked={selectedCategory.isActive}
                                    {...register('isActive')}
                                />
                                <label htmlFor="isActiveUpdate" className="text-[14px] font-[500] leading-5 text-[#464F60] cursor-pointer">
                                    Active
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                        <button
                            onClick={handleCancel}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 button_cancel-shadow">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onSubmitUpdate)}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#0F60FF]">
                            Update
                        </button>
                    </div>
                </Modal>
            )}
        </LayoutDashboard>
    );
};

export default CategoryPage;