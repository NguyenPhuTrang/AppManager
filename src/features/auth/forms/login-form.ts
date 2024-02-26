import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../stores";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../../common/helpers";
import { LoginFormInputs } from "../../../types";
import { loginWithPasswordSchema } from "../schema";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginWithPasswordSchema)
    });

    const { showSuccessNotification, showErrorNotification } = useNotification();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const res = await authStore.login({
            email: data.email,
            password: data.password
        });
        
        if (res.success) {
            navigate('/product');
            // window.location.href = '/product'
            showSuccessNotification("Đăng nhập thành công", "Bạn đã đăng nhập thành công!");
        } else {
            showErrorNotification('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng');
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors
    };
};
