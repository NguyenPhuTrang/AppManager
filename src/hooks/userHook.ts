import { useMemo, useState } from "react";
import { useNotification } from "../common/helpers";
import { ICommonListQuery } from "../common/interfaces";
import { userApi } from '../services/user.service';
import { HttpStatus } from "../common/constants";
import { User, userForm } from "../types";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../schemas/user.schema";
import { increment } from "../features/actions/active";

export async function getAllUsers(query: ICommonListQuery): Promise<any> {
    try {
        const response = await userApi.getAll<any>(query);
        return response;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}

export const useCreateUsers = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const memoizedSelectedUser = useMemo(() => selectedUser, [selectedUser]);

    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { showSuccessNotification, showErrorNotification } = useNotification();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<userForm>({
        resolver: yupResolver(userSchema)
    });

    const closeModal = () => {
        reset();
        dispatch(increment(true));
    }

    const useOnSubmitCreate: SubmitHandler<userForm> = async (data) => {
        try {
            const res = await userApi.create({
                name: data.name,
                email: data.email,
                birthday: data.birthday,
                numberPhone: data.numberPhone,
                avatarUrl: data.avatarUrl,
                role: 'user',
                password: 'user-password'
            })
            if (res.code === HttpStatus.BAD_REQUEST) {
                showErrorNotification("Another failure", "This user already exists")
            }
            if (res.success) {
                closeModal();
                setIsCreate(!isCreate);
                reset({
                    name: "",
                    email: "",
                    numberPhone: "",
                    birthday: "",
                    avatarUrl: "",
                });
                showSuccessNotification("Another success", "Another user created successfully !");
            }
        } catch (error) {
            showErrorNotification("Another failure", "Another user creation failed")
            console.log("create failed: ", error);
        }
    }

    const useOnSubmitUpdate: SubmitHandler<userForm> = async (data) => {
        if (!selectedUser) return;
        try {
            const res = await userApi.update({
                id: selectedUser.id,
                body: {
                    name: data.name,
                    email: data.email,
                    birthday: data.birthday,
                    numberPhone: data.numberPhone,
                    avatarUrl: data.avatarUrl
                }
            })
            if (res.code === HttpStatus.BAD_REQUEST)  {
                showErrorNotification("Another failure", "This user already exists")
            }
            if (res.success) {
                closeModal();
                resetForm();
                setIsUpdate(!isUpdate);
                showSuccessNotification("Another success", "Another user updated successfully !");
            }
        } catch (error) {
            showErrorNotification("Another failure", "Another user update failed !");
            console.log("create failed: ", error);
        }
    }

    const resetForm = () => {
        reset({
            name: "",
            email: "",
            numberPhone: "",
            birthday: "",
            avatarUrl: "",
        });
        setSelectedUser(null);
    }

    const selectUserForUpdate = (user: User) => {
        setSelectedUser(user);
    }

    return {
        reset,
        register,
        handleSubmit,
        useOnSubmitCreate,
        useOnSubmitUpdate,
        resetForm,
        selectUserForUpdate,
        selectedUser: memoizedSelectedUser,
        errors,
        isCreate,
        isUpdate,
    }
}

export const useDeleteUsers = () => {
    const { showSuccessNotification, showErrorNotification } = useNotification();
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDeleteUser = async (userId: any) => {
        try {
            const res = await userApi.delete(userId);
            if (res.code === HttpStatus.OK) {
                showSuccessNotification("Another success", "Another user deleted successfully !");
                setIsDeleted(!isDeleted);
            }
        } catch (error) {
            console.error("User deleted failed", error);
            showErrorNotification("Another failure", "Another user deletion failed !");
        }
    }
    const resetIsDeleted = () => {
        setIsDeleted(false);
    };
    return {
        handleDeleteUser,
        resetIsDeleted,
        isDeleted
    };
}