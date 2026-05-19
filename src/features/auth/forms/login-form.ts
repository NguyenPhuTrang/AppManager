import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../stores";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormInputs } from "../../../types";
import { loginWithPasswordSchema } from "../schema";

export const useLoginForm = () => {
    const authStore = useAuthStore();

    const {
        register, handleSubmit, formState: { errors }
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginWithPasswordSchema)
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const res = await authStore.login({
            email: data.email,
            password: data.password
        });

        if (!res.success) {
            throw new Error('Incorrect email or password');
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors
    };
};