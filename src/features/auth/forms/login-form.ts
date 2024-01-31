import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../../stores";

interface LoginFormInputs {
    email: string;
    password: string;
}

export const useLoginForm = () => {
    const authStore = useAuthStore();
    const { register: loginRegister, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        console.log(data);

        const res = await authStore.login({
            email: data.email,
            password: data.password
        });
        if (res.success) {
            console.log("Successfully logged in");
        } else {
            console.error("Login failed");
        }
    };

    return {
        loginRegister,
        loginHandleSubmit: loginHandleSubmit(onSubmit),
        loginErrors
    };
};
