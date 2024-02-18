import { Product, createProductForm, updateProductForm } from '../../types/index';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../plugins/yup";
import { useDispatch } from "react-redux";
import { ICommonListQuery } from "../../common/interfaces";
import { useNotification } from '../../common/helpers';
import { HttpStatus } from "../../common/constants";
import { productApi } from "../../services";
import { increment } from '../actions/active';
import { useState } from 'react';

export async function getAllProducts(query: ICommonListQuery): Promise<any> {
    try {
        const response = await productApi.getAll<any>(query);
        return response;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}


export const useCreateProducts = () => {
    const schema = yup.object().shape({
        name: yup.string().required('Tên sản phẩm là bắt buộc').max(255, 'Tên sản phẩm không được vượt quá 255 ký tự'),
        price: yup.number().typeError('Giá sản phẩm phải là số').required('Giá sản phẩm là bắt buộc').positive('Giá sản phẩm phải là số lớn hơn 0').integer('Giá sản phẩm phải là số nguyên'),
        quantity: yup.number().typeError('Số lượng sản phẩm phải là số').required('Số lượng sản phẩm là bắt buộc').positive('Số lượng sản phẩm phải là số lớn hơn 0').integer('Số lượng sản phẩm phải là số nguyên'),
        description: yup.string().required('Mô tả sản phẩm là bắt buộc'),
        image: yup.string().url('Link ảnh sản phẩm không hợp lệ').required('Link ảnh sản phẩm là bắt buộc')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<createProductForm>({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(increment(true));
    }
    const { showSuccessNotification, showErrorNotification } = useNotification();
    const useOnSubmitCreate: SubmitHandler<createProductForm> = async (data) => {
        try {
            const res = await productApi.create({
                name: data.name,
                price: data.price.toString(),
                quantity: data.quantity.toString(),
                description: data.description,
                image: data.image
            })
            if (res.success) {
                closeModal();
                showSuccessNotification("Thêm thành công", "Thêm sản phẩm thành công!");
            }

        } catch (error) {
            showErrorNotification("Thêm thất bại", "Thêm sản phẩm thất bại!");
            console.log("create failed: ", error);
        }
    }

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const useOnSubmitUpdate: SubmitHandler<createProductForm> = async (data) => {
        if (!selectedProduct) return;
        try {
            const res = await productApi.update({
                id: selectedProduct?.id,
                body: {
                    name: data.name,
                    price: data.price.toString(),
                    quantity: data.quantity.toString(),
                    description: data.description,
                    image: data.image
                }
            })
            if (res.success) {
                closeModal();
                showSuccessNotification("Sửa thành công", "Sửa sản phẩm thành công!");
            }

        } catch (error) {
            showErrorNotification("Sửa thất bại", "Sửa sản phẩm thất bại!");
            console.log("create failed: ", error);
        }
    }

    const resetForm = () => {
        reset();
        setSelectedProduct(null);
    };

    const selectProductForUpdate = (product: Product) => {
        setSelectedProduct(product);
    };

    return {
        register,
        handleSubmit,
        useOnSubmitCreate,
        useOnSubmitUpdate,
        resetForm,
        selectProductForUpdate,
        selectedProduct,
        errors,
    }
}

export const useDeleteProducts = () => {
    const { showSuccessNotification, showErrorNotification } = useNotification();
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDeleteProduct = async (productId: any) => {
        try {
            const res = await productApi.delete(productId);
            if (res.code === HttpStatus.OK) {
                showSuccessNotification("Xóa thành công", "Xóa sản phẩm thành công!");
                setIsDeleted(true);
            }
        } catch (error) {
            console.error("Product deleted failed", error);
            showErrorNotification("Xóa thất bại", "Xóa sản phẩm thất bại!");
        }
    }
    const resetIsDeleted = () => {
        setIsDeleted(false);
    };
    return {
        handleDeleteProduct,
        resetIsDeleted,
        isDeleted
    };
}