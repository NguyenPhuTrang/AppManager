import * as actions from "../actions";
import { createProductForm, createProductProps } from '../../types/index';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../plugins/yup";
import { useDispatch } from "react-redux";
import { increment } from "../actions/active";
import { ICommonListQuery } from "../../common/interfaces";

export async function getAllProducts(query: ICommonListQuery): Promise<any> {
    try {
        const res = await actions.getActionProduct(query);
        return res;
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
        formState: { errors }
    } = useForm<createProductForm>({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(increment(true));
    }
    const useOnSubmit: SubmitHandler<createProductForm> = async (data) => {
        const res = await actions.createActionProduct({
            name: data.name,
            price: data.price.toString(),
            quantity: data.quantity.toString(),
            description: data.description,
            image: data.image
        })
        if (res.success) {
            closeModal();
            console.log("create done: ", res);
        } else {
            console.log("create failed: ");
        }
    }
    return {
        register,
        handleSubmit,
        useOnSubmit,
        errors
    }
}

export async function deleteProduct(productId: string) {
    const res = await actions.deleteActionProduct(productId);
    return res;
}