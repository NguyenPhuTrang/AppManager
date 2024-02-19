import { useState } from "react";
import { useNotification } from "../../common/helpers";
import { ICommonListQuery } from "../../common/interfaces";
import { userApi } from './../../services/user.service';
import { HttpStatus } from "../../common/constants";

export async function getAllUsers(query: ICommonListQuery): Promise<any> {
    try {
        const response = await userApi.getAll<any>(query);
        return response;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}

export const useDeleteUsers = () => {
    const { showSuccessNotification, showErrorNotification } = useNotification();
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDeleteUser = async (userId: any) => {
        try {
            const res = await userApi.delete(userId);
            if (res.code === HttpStatus.OK) {
                showSuccessNotification("Xóa thành công", "Xóa sản phẩm thành công!");
                setIsDeleted(!isDeleted);
            }
        } catch (error) {
            console.error("User deleted failed", error);
            showErrorNotification("Xóa thất bại", "Xóa sản phẩm thất bại!");
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