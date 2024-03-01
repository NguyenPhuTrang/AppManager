import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../../common/helpers";
import { RegisterFormInputs } from "../interfaces";
import { registerSchema } from "../schema";
import { HttpStatus } from "../../../common/constants";

export const useRegisterForm = () => {
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<RegisterFormInputs>({
        resolver: yupResolver(registerSchema)
    });
    const { showSuccessNotification, showErrorNotification } = useNotification();
    
    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        const res = await authStore.register({
            name: data.name,
            email: data.email,
            numberPhone: data.numberPhone,
            birthday: data.birthday,
            avatarUrl: data.avatarUrl,
            role: "admin",
            password: data.password
        })

        if (res?.code === HttpStatus.OK) {
            navigate('/login');
            showSuccessNotification("Đăng ký thành công", "Đăng ký thành công tài khoản")
        } else {
            showErrorNotification("Đăng ký thất bại", "Đăng ký thất bại tài khoản")
        }
    }
    
    return {
        register,
        handleSubmit, 
        onSubmit,
        errors
    };
};