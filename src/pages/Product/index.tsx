import React, { useEffect, useState } from 'react';
import LayoutDashboard from '../LayoutDashboard';
import Navigation from "../../components/Navigation";
import Modal from "../../components/Modal";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment } from '../../features/actions/active';
import * as ProductApi from '../../hooks';
import { RootState } from '../../common/interfaces';
import { AxiosResponse } from 'axios';
import { Product } from '../../types';
import { useCreateProducts, useDeleteProducts } from '../../hooks';
import { totalPage, totalData } from '../../features/actions/page';
import { setIsCreatOrUpdate } from '../../features/actions/isCreateOrUpdate';

const ProductPage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [showModalDelele, setShowModalDelele] = useState(false);
    const active = useSelector((state: RootState) => state.active);
    const isCreateOrUpdate = useSelector((state: RootState) => state.isCreateOrUpdate);
    const page = useSelector((state: RootState) => state.page);

    const totalPages = Math.ceil(page.totalData / page.limit);
    const {
        register,
        handleSubmit,
        useOnSubmitCreate,
        useOnSubmitUpdate,
        resetForm,
        selectProductForUpdate,
        selectedProduct,
        errors,
        isCreate,
        isUpdate,

    } = useCreateProducts();
    console.log(selectedProduct);
    

    const { handleDeleteProduct, isDeleted } = useDeleteProducts();
    const [idDeleteProduct, setIdDeleteProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response: AxiosResponse<any> = await ProductApi.getAllProducts({
                    page: page.number,
                    limit: page.limit,
                });
                dispatch(totalData(response.data.totalItems));
                if (totalPages === 0) {
                    dispatch(totalPage(1));
                } else {
                    dispatch(totalPage(totalPages));
                }
                setProducts((await response.data.items));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();

    }, [isDeleted, isCreate, isUpdate, page.limit, page.number, totalPages, dispatch]);

    const handleClickUpdate = (product: Product) => {
        selectProductForUpdate(product);
        dispatch(increment(true));
        dispatch(setIsCreatOrUpdate('update'));
    }

    const handleCancel = () => {
        resetForm();
        dispatch(increment(true));
    };

    const handleShowModalDelete = (id: any) => {
        setIdDeleteProduct(id);
        setShowModalDelele(true);
    }

    const handleSubmitDelete = () => {
        handleDeleteProduct(idDeleteProduct);
        setShowModalDelele(false);
        setIdDeleteProduct(null);
    }

    return (
        <LayoutDashboard>
            <div className="w-full flex flex-col bg-white rounded-[16px] pt-2 pb-[21px] table-shadow">
                <table className="min-w-full divide-y divide-[#E9E7FD] pl-[16px] pr-[24px]">
                    <thead>
                        <tr>
                            <th className="py-4 pr-5 pl-9 text-left text-[13px] select-none text-[#8B909A] font-[500]">TÊN SẢN PHẨM</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">GIÁ</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">SỐ LƯỢNG</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">MÔ TẢ</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">ẢNH</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E7FD]">
                        {products.length === 0 ? (
                            <tr>
                                <td className="py-4 pr-5 pl-9 text-[15px] text-[#23272E] select-none font-[600]">Không có sản phẩm nào.</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="">
                                    <td className="py-4 pr-5 pl-9 text-[15px] text-[#23272E] select-none font-[600]">{product.name}</td>
                                    <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{product.price}</td>
                                    <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{product.quantity}</td>
                                    <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400] w-[313px]">{product.description}</td>
                                    <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">
                                        <img src={product.image} alt="" className="w-9 h-9 rounded-[2px]" />
                                    </td>
                                    <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[600]">
                                        <div className="w-full h-full flex gap-[10px] items-center">
                                            <img
                                                src="../icons/ic-edit.svg"
                                                className="w-6 h-6 cursor-pointer"
                                                alt=""
                                                onClick={() => handleClickUpdate(product)}
                                            />
                                            <img
                                                src="../icons/ic-trash.svg"
                                                className="w-6 h-6 cursor-pointer"
                                                alt=""
                                                onClick={() => handleShowModalDelete(product.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <hr></hr>
                <Navigation />
            </div>

            {
                showModalDelele && (
                    <Modal title={'Xóa sản phẩm'}>
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all px-6 pb-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <p className="text-sm text-red-600">Bạn muốn xóa sản phẩm này?</p>
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
                    <Modal title={'Tạo mới sản phẩm'}>
                        <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                            <form
                                className="w-full flex flex-col gap-4"
                            >
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Tên sản phẩm
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.name ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập tên sản phẩm"
                                        type='text'
                                        {...register('name')}
                                    />
                                    {errors.name && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.name.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Giá
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.price ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập giá sản phẩm"
                                        {...register('price')}
                                    />

                                    {errors.price && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.price.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Số lượng
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.quantity ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập số lượng sản phẩm"
                                        {...register('quantity')}
                                    />
                                    {errors.quantity && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.quantity.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Mô tả</label>
                                    <textarea
                                        rows={6}
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.description ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập mô tả"
                                        {...register('description')}
                                    />
                                    {errors.description && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.description.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Ảnh sản phẩm
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.image ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập link ảnh sản phẩm"
                                        {...register('image')}
                                    />
                                    {errors.image && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.image.message}</span>}
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                            <button
                                onClick={handleCancel}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 button_cancel-shadow">
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit(useOnSubmitCreate)}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#0F60FF]">
                                Tạo mới
                            </button>
                        </div>
                    </Modal>
                )
            }
            {
                active && isCreateOrUpdate === 'update' && selectedProduct && (
                    <Modal title={'Cập nhật sản phẩm'}>
                        <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                            <form
                                className="w-full flex flex-col gap-4"
                            >
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Tên sản phẩm
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.name ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập tên sản phẩm"
                                        type='text'
                                        defaultValue={selectedProduct.name}
                                        {...register('name')}
                                    />
                                    {errors.name && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.name.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Giá
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='number'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.price ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập giá sản phẩm"
                                        defaultValue={selectedProduct.price}
                                        {...register('price')}
                                    />

                                    {errors.price && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.price.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Số lượng
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='number'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.quantity ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập số lượng sản phẩm"
                                        defaultValue={selectedProduct.quantity}
                                        {...register('quantity')}
                                    />
                                    {errors.quantity && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.quantity.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Mô tả</label>
                                    <textarea
                                        rows={6}
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.description ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập mô tả"
                                        defaultValue={selectedProduct.description}
                                        {...register('description')}
                                    />
                                    {errors.description && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.description.message}</span>}
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Ảnh sản phẩm
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none
                                        ${errors.image ? 'input-shadow-error' : 'input-shadow'}`}
                                        placeholder="Nhập link ảnh sản phẩm"
                                        defaultValue={selectedProduct.image}
                                        {...register('image')}
                                    />
                                    {errors.image && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.image.message}</span>}
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                            <button
                                onClick={handleCancel}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 button_cancel-shadow">
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
        </LayoutDashboard >
    );
};

export default ProductPage;