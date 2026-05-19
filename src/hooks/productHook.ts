import { Product, productForm } from '../types/index';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { ICommonListQuery } from "../common/interfaces";
import { HttpStatus } from "../common/constants";
import { productApi } from "../services/product.service";
import { increment } from '../features/actions/active';
import { useState } from 'react';
import { productSchema } from '../schemas/product.schema';

export async function getAllProducts(query: ICommonListQuery): Promise<any> {
    try {
        const response = await productApi.getAll<any>(query);
        return response;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}

interface CreateProductCallbacks {
    onSuccess?: (message: string) => void;
    onError?: (message: string) => void;
}

export const useCreateProducts = (callbacks?: CreateProductCallbacks) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
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
                image: data.image,
                categoryId: data.categoryId || '',
                rating: "0",
                sale: "0"
            });
            if (res.code === HttpStatus.BAD_REQUEST) {
                callbacks?.onError?.('This product already exists.');
            }
            if (res.success) {
                closeModal();
                setIsCreate(!isCreate);
                callbacks?.onSuccess?.('Product added successfully !');
            }
        } catch (error) {
            callbacks?.onError?.('Failed to add product');
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
                    image: data.image,
                    categoryId: data.categoryId || '',
                }
            });
            if (res.code === HttpStatus.BAD_REQUEST) {
                callbacks?.onError?.('This product already exists !');
            }
            if (res.success) {
                closeModal();
                setIsUpdate(!isUpdate);
                callbacks?.onSuccess?.('Product updated successfully !');
            }
        } catch (error) {
            callbacks?.onError?.('Failed to update product');
            console.log("update failed: ", error);
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
        setValue,
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

interface DeleteProductCallbacks {
    onSuccess?: (message: string) => void;
    onError?: (message: string) => void;
}

export const useDeleteProducts = (callbacks?: DeleteProductCallbacks) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDeleteProduct = async (productId: any) => {
        try {
            const res = await productApi.delete(productId);
            if (res.code === HttpStatus.OK) {
                callbacks?.onSuccess?.('Product deleted successfully !');
                setIsDeleted(!isDeleted);
            }
        } catch (error) {
            console.error("Product deleted failed", error);
            callbacks?.onError?.('Failed to delete product !');
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