import * as actions from "../actions";
import { createProductProps } from '../../types/index';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../plugins/yup";
import { useDispatch } from "react-redux";
import { increment } from "../actions/active";

export async function getAllProducts() {
    const res = await actions.getProduct();
    return res;
}

export const useCreateProducts = () => {
    const schema = yup.object().shape({
        name: yup.string().required('Tên sản phẩm là bắt buộc').max(255, 'Tên sản phẩm không được vượt quá 255 ký tự'),
        price: yup.number().required('Giá sản phẩm là bắt buộc').positive('Giá sản phẩm phải là số dương').integer('Giá sản phẩm phải là số nguyên'),
        quantity: yup.number().required('Số lượng sản phẩm là bắt buộc').positive('Số lượng sản phẩm phải là số dương').integer('Số lượng sản phẩm phải là số nguyên'),
        description: yup.string().required('Mô tả sản phẩm là bắt buộc'),
        image: yup.string().url('Link ảnh sản phẩm không hợp lệ').required('Link ảnh sản phẩm là bắt buộc')
    }); 

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<createProductProps>({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(increment(true));
    }

    const useOnSubmit: SubmitHandler<createProductProps> = async (data) => {
        
        const res = await actions.createProduct({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: data.description,
            image: data.image
        })

        if(res.success) {
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