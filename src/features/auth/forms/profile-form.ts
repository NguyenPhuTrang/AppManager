import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../../schemas/user.schema";
import { User, userForm } from "../../../types";
import { useNotification } from "../../../common/helpers";
import { HttpStatus } from "../../../common/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/interfaces";

export const useProfileForm = () => {
    const userProfile = useSelector((state: RootState) => state.userProfile);

    const authStore = useAuthStore();
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { errors }, setValue
    } = useForm<userForm>({
        resolver: yupResolver(userSchema)
    });

    const { showSuccessNotification, showErrorNotification } = useNotification();

    const onSubmit: SubmitHandler<userForm> = async (data) => {
        const res = await authStore.updateProfile({
            id: userProfile.id,
            body: {
                name: data.name,
                email: data.email,
                birthday: data.birthday,
                numberPhone: data.numberPhone,
                avatarUrl: data.avatarUrl,
            }
        });
        if (res?.code === HttpStatus.OK) {
            showSuccessNotification("Cập nhật thành công", "Bạn đã cập nhật hồ sơ thành công");
            navigate("/product");
        } else {
            showErrorNotification("Cập nhật thất bại", "Bạn đã cập nhật hồ sơ thất bại");
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        setValue,
        errors
    };
}