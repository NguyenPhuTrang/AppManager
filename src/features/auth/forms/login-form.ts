import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../stores";
import yup from "../../../plugins/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../../common/helpers";
import { LoginFormInputs } from "../../../types";

export const useLoginForm = () => {
    const authStore = useAuthStore();

    const schema = yup.object().shape({
        email: yup.string().email("Email không đúng định dạng").required("Email là trường bắt buộc"),
        password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(20, 'Mật khẩu không được quá 20 ký tự').required("Mật khẩu là trường bắt buộc")
    });

    const {
        register, handleSubmit, formState: { errors }
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema)
    });

    const { showSuccessNotification, showErrorNotification } = useNotification();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const res = await authStore.login({
            email: data.email,
            password: data.password
        });
        if (res.success) {
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
