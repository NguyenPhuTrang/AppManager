import { useDispatch } from "react-redux";
import { userApiService } from "../services";
import { setUserProfile } from "../../actions/userProfile";
import { UserProfile } from "../../../types";

export const useUserStore = () => {
    const dispatch = useDispatch();

    async function getUserProfile() {
        try {
            const res = await userApiService._getOwnProfile();
            if (res.success) {
                const userProfileData: UserProfile = res.data as UserProfile;
                dispatch(setUserProfile(userProfileData));
            }
        } catch (error) {
            console.error("Error getting user profile:", error);
        }
    }

    return {
        getUserProfile
    };
};
