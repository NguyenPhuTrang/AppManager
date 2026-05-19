import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LayoutDashboard from '../../layouts/LayoutDashboard';
import Navigation from "../../components/Navigation";
import Modal from "../../components/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../features/actions/active';
import * as ProductApi from '../../hooks';
import { RootState } from '../../common/interfaces';
import { AxiosResponse } from 'axios';
import { Product } from '../../types';
import { useCreateProducts, useDeleteProducts } from '../../hooks';
import { totalPage, totalData } from '../../features/actions/page';
import { setIsCreatOrUpdate } from '../../features/actions/isCreateOrUpdate';
import Loading from '../../components/Loading';
import ModalDelete from '../../components/ModalDelete';
import { categoryApi } from '../../services/category.service';

interface ICategory {
    _id: string;
    title: string;
    icon: string;
}

type ToastVariant = 'success' | 'error';

interface ToastState {
    show: boolean;
    visible: boolean;
    variant: ToastVariant;
    message: string;
}

const ProductToast = ({ visible, variant, message }: Omit<ToastState, 'show'>) => {
    const isSuccess = variant === 'success';

    const el = (
        <>
            <style>{`
                @keyframes toastSlideDown {
                    from { transform: translateX(-50%) translateY(-120%); opacity: 0; }
                    to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
                }
                @keyframes toastSlideUp {
                    from { transform: translateX(-50%) translateY(0);     opacity: 1; }
                    to   { transform: translateX(-50%) translateY(-120%); opacity: 0; }
                }
                .prod-toast-enter { animation: toastSlideDown 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards; }
                .prod-toast-exit  { animation: toastSlideUp   0.30s cubic-bezier(0.4,0,1,1) forwards; }
            `}</style>
            <div
                className={`fixed top-5 left-1/2 z-[9999] flex items-center gap-3
                    bg-white rounded-2xl px-5 py-3.5
                    shadow-[0_8px_32px_rgba(220,100,150,0.22),0_2px_8px_rgba(0,0,0,0.08)]
                    border border-[#fce8ee] min-w-[260px] max-w-[380px]
                    ${visible ? 'prod-toast-enter' : 'prod-toast-exit'}`}
                style={{ transform: 'translateX(-50%)' }}
                role="status"
                aria-live="polite"
            >
                <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-[#f0a0bc] to-[#c04060]
                    shadow-[0_4px_10px_rgba(220,100,150,0.35)]">
                    {isSuccess ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    )}
                </div>

                <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-[700] text-[#3d1a2b] leading-tight">
                        {message}
                    </span>
                </div>
            </div>
        </>
    );

    return createPortal(el, document.body);
};

const DISPLAY_MS = 2500;
const EXIT_MS = 320;
/* ─────────────────────────────────────────────────────────────────────────── */

const ProductPage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [showModalDelele, setShowModalDelele] = useState(false);
    const active = useSelector((state: RootState) => state.active);
    const isCreateOrUpdate = useSelector((state: RootState) => state.isCreateOrUpdate);
    const page = useSelector((state: RootState) => state.page);
    const keyword = useSelector((state: RootState) => state.keyword);

    const totalPages = Math.ceil(page.totalData / page.limit);

    const [sortPrice, setSortPrice] = useState('');
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [idDeleteProduct, setIdDeleteProduct] = useState(null);

    const [toastState, setToastState] = useState<ToastState>({
        show: false, visible: false, variant: 'success', message: '',
    });

    const triggerToast = useCallback((variant: ToastVariant, message: string) => {
        setToastState(prev => ({ ...prev, visible: false, show: false }));
        setTimeout(() => {
            setToastState({ show: true, visible: true, variant, message });
            setTimeout(() => {
                setToastState(prev => ({ ...prev, visible: false }));
                setTimeout(() => setToastState(prev => ({ ...prev, show: false })), EXIT_MS);
            }, DISPLAY_MS);
        }, 50);
    }, []);

    const {
        register,
        handleSubmit,
        useOnSubmitCreate: onSubmitCreate,
        useOnSubmitUpdate: onSubmitUpdate,
        resetForm,
        selectProductForUpdate,
        selectedProduct,
        errors,
        isCreate,
        isUpdate,
        setValue,
    } = useCreateProducts();

    const { handleDeleteProduct: _handleDeleteProduct, isDeleted } = useDeleteProducts();

    // Wrap để bắt kết quả và hiện toast
    const handleDeleteProduct = async (id: any) => {
        try {
            await _handleDeleteProduct(id);
            triggerToast('success', 'Product removed successfully !');
        } catch {
            triggerToast('error', 'Failed to remove product !');
        }
    };

    const wrappedOnSubmitCreate = async (data: any) => {
        try {
            await onSubmitCreate(data);
            triggerToast('success', 'Product added successfully !');
        } catch {
            triggerToast('error', 'Failed to add product !');
        }
    };

    const wrappedOnSubmitUpdate = async (data: any) => {
        try {
            await onSubmitUpdate(data);
            triggerToast('success', 'Product updated successfully !');
        } catch {
            triggerToast('error', 'Failed to update product !');
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAll<ICategory>({});
                setCategories(response.data?.items || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let queryParams: {
                    page: number;
                    limit: number;
                    keyword?: string;
                    orderBy?: string;
                    orderDirection?: string;
                    price?: string;
                    rating?: string;
                    categoryId?: string;
                } = {
                    page: page.number,
                    limit: page.limit
                };

                if (keyword) queryParams.keyword = keyword;
                if (sortPrice !== '') queryParams.price = sortPrice;
                if (selectedCategory !== '') queryParams.categoryId = selectedCategory;

                const response: AxiosResponse<any> = await ProductApi.getAllProducts(queryParams);
                dispatch(totalData(response.data.totalItems));
                dispatch(totalPage(Math.ceil(response.data.totalItems / page.limit)));
                setProducts(response.data.items);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [isDeleted, isCreate, isUpdate, page.limit, page.number, totalPages, dispatch, keyword, sortPrice, selectedCategory]);

    useEffect(() => {
        if (isCreateOrUpdate === 'update' && selectedProduct) {
            setValue('name', selectedProduct.name);
            setValue('price', selectedProduct.price);
            setValue('quantity', selectedProduct.quantity);
            setValue('description', selectedProduct.description || '');
            setValue('image', selectedProduct.image || '');
            setValue('categoryId', (selectedProduct as any).categoryId || '');
        }
    }, [isCreateOrUpdate, selectedProduct]);

    useEffect(() => {
        if (isCreateOrUpdate === 'create') {
            setValue('categoryId', '');
        }
    }, [isCreateOrUpdate]);

    const handleClickUpdate = (product: Product) => {
        selectProductForUpdate(product);
        dispatch(increment(true));
        dispatch(setIsCreatOrUpdate('update'));
    };

    const handleCancel = () => {
        resetForm();
        dispatch(increment(true));
    };

    const handleShowModalDelete = (id: any) => {
        setIdDeleteProduct(id);
        setShowModalDelele(true);
    };

    const handleSubmitDelete = () => {
        handleDeleteProduct(idDeleteProduct);
        setShowModalDelele(false);
        setIdDeleteProduct(null);
    };

    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const categorySelect = (
        <div className="w-full flex flex-col gap-2">
            <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Danh mục</label>
            <select
                className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none input-shadow"
                {...register('categoryId')}
            >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
            </select>
        </div>
    );

    return (
        <LayoutDashboard>

            {toastState.show && (
                <ProductToast
                    visible={toastState.visible}
                    variant={toastState.variant}
                    message={toastState.message}
                />
            )}

            <div className="w-full h-full flex flex-col bg-white rounded-[16px] pt-2 pb-[21px] overflow-y-auto table-shadow">
                <div className="flex items-center gap-2 px-6 py-3 border-b border-[#E9E7FD] overflow-x-auto">
                    <button
                        onClick={() => setSelectedCategory('')}
                        className={`px-3 py-1.5 rounded-lg text-[13px] font-[500] whitespace-nowrap transition-all
                            ${selectedCategory === ''
                                ? 'bg-[#e87aab] text-white'
                                : 'bg-[#F3F4F8] text-[#8B909A] hover:bg-[#E9E7FD]'
                            }`}
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setSelectedCategory(cat._id)}
                            className={`px-3 py-1.5 rounded-lg text-[13px] font-[500] whitespace-nowrap transition-all
                                ${selectedCategory === cat._id
                                    ? 'bg-[#e87aab] text-white'
                                    : 'bg-[#F3F4F8] text-[#8B909A] hover:bg-[#E9E7FD]'
                                }`}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>

                <table className="min-w-full divide-y divide-[#E9E7FD] pl-[16px] pr-[24px]">
                    <thead>
                        <tr>
                            <th className="py-4 pr-5 pl-9 text-left text-[13px] select-none text-[#8B909A] font-[500]">PRODUCT NAME</th>
                            <th className="py-4 px-5 text-left text-[13px] max-w-[165px] h-[72px] gap-2 select-none text-[#8B909A] font-[500] flex items-center">
                                <p>PRICE</p>
                                <div className='flex flex-col items-center justify-center gap-1'>
                                    <img onClick={() => setSortPrice('asc')} src="./icons/ic-top.svg" alt="icon" className='w-[10px] cursor-pointer' />
                                    <img onClick={() => setSortPrice('desc')} src="./icons/ic-bottom.svg" alt="icon" className='w-[10px] cursor-pointer' />
                                </div>
                            </th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">QUANTITY</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">DESCRIPTION</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">IMAGE</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">CATEGORY</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">ACTION</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <Loading />
                    ) : (
                        <tbody className="divide-y divide-[#E9E7FD]">
                            {products.length === 0 ? (
                                <tr>
                                    <td className="py-4 pr-5 pl-9 text-[15px] text-[#23272E] select-none font-[600]">No products.</td>
                                </tr>
                            ) : (
                                products.map((product) => {
                                    const categoryName = categories.find(c => c._id === (product as any).categoryId)?.title || '—';
                                    return (
                                        <tr key={product.id}>
                                            <td className="py-4 pr-5 pl-9 text-[15px] max-w-[200px] min-w-[160px] text-[#23272E] select-none font-[600] public-sans">{product.name}</td>
                                            <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400] public-sans">${formatMoney(product.price)}</td>
                                            <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400] max-w-[80px] public-sans">{product.quantity}</td>
                                            <td className="py-4 px-5 text-[15px] min-w-[250px] max-w-[350px] text-[#23272E] font-[400] public-sans max-h-30">
                                                <div className="line-clamp-5 h-full w-full overflow-hidden select-none">
                                                    {product.description}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">
                                                <img src={product.image} alt="" className="w-9 h-9 rounded-[2px]" />
                                            </td>
                                            <td className="py-4 px-5 text-[13px] text-[#23272E] select-none font-[400]">
                                                <span className="px-2 py-1 rounded-lg bg-[#F3F4F8] text-[#8B909A] text-[12px] whitespace-nowrap">
                                                    {categoryName}
                                                </span>
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
                                    );
                                })
                            )}
                        </tbody>
                    )}
                </table>
                <hr />
                <Navigation />
            </div>

            {showModalDelele && (
                <ModalDelete
                    title="Confirm deletion of product"
                    description="Are you sure you want to delete this product ?"
                    handleSubmit={handleSubmitDelete}
                    handleClose={() => setShowModalDelele(false)}
                />
            )}

            {active && isCreateOrUpdate === 'create' && (
                <Modal title={'Create new product'}>
                    <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                        <form className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Product Name
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.name ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product name"
                                    type='text'
                                    {...register('name')}
                                />
                                {errors.name && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.name.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Price
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    type='text'
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.price ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product price"
                                    {...register('price')}
                                />
                                {errors.price && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.price.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Quantity
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    type='text'
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.quantity ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product quantity"
                                    {...register('quantity')}
                                />
                                {errors.quantity && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.quantity.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Description</label>
                                <textarea
                                    rows={6}
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.description ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product description"
                                    {...register('description')}
                                />
                                {errors.description && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.description.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Product Image
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    type='text'
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.image ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product image link"
                                    {...register('image')}
                                />
                                {errors.image && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.image.message}</span>}
                            </div>
                            {categorySelect}
                        </form>
                    </div>
                    <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                        <button
                            onClick={handleCancel}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 button_cancel-shadow">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(wrappedOnSubmitCreate)}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#e87aab]">
                            Create
                        </button>
                    </div>
                </Modal>
            )}

            {active && isCreateOrUpdate === 'update' && selectedProduct && (
                <Modal title={'Update Product'}>
                    <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                        <form className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Product Name
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.name ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product name"
                                    type='text'
                                    {...register('name')}
                                />
                                {errors.name && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.name.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Price
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    type='text'
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.price ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product price"
                                    {...register('price')}
                                />
                                {errors.price && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.price.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Quantity
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    type='text'
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.quantity ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product quantity"
                                    {...register('quantity')}
                                />
                                {errors.quantity && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.quantity.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Description</label>
                                <textarea
                                    rows={6}
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.description ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product description"
                                    {...register('description')}
                                />
                                {errors.description && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.description.message}</span>}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Product Image
                                    <span className="text-[14px] font-[500] leading-5 text-[#e87aab]"> *</span>
                                </label>
                                <input
                                    type='text'
                                    className={`py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#464F60] rounded-md outline-none
                                    ${errors.image ? 'input-shadow-error' : 'input-shadow'}`}
                                    placeholder="Enter product image link"
                                    {...register('image')}
                                />
                                {errors.image && <span className="text-red-500 text-[14px] font-[500] leading-[20px] select-none">{errors.image.message}</span>}
                            </div>
                            {categorySelect}
                        </form>
                    </div>
                    <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                        <button
                            onClick={handleCancel}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 button_cancel-shadow">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(wrappedOnSubmitUpdate)}
                            className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#e87aab]">
                            Update
                        </button>
                    </div>
                </Modal>
            )}
        </LayoutDashboard>
    );
};

export default ProductPage;