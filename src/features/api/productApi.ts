import { Product, productForm } from '../../types/index';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { ICommonListQuery } from "../../common/interfaces";
import { useNotification } from '../../common/helpers';
import { HttpStatus } from "../../common/constants";
import { productApi } from "../../services/product.service";
import { increment } from '../actions/active';
import { useState } from 'react';
import { productSchema } from '../../schemas/product.schema';

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { showSuccessNotification, showErrorNotification } = useNotification();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<productForm>({
        resolver: yupResolver(productSchema)
    });
    const closeModal = () => {
        reset();
        dispatch(increment(true));
    }
    const useOnSubmitCreate: SubmitHandler<productForm> = async (data) => {
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
                setIsCreate(!isCreate);
                showSuccessNotification("Thêm thành công", "Thêm sản phẩm thành công!");
            }

        } catch (error) {
            showErrorNotification("Thêm thất bại", "Thêm sản phẩm thất bại!");
            console.log("create failed: ", error);
        }
    }

    const useOnSubmitUpdate: SubmitHandler<productForm> = async (data) => {
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
                setIsUpdate(!isUpdate);
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
        isCreate,
        isUpdate,
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
                setIsDeleted(!isDeleted);
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