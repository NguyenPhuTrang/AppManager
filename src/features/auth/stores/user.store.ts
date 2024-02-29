import { useDispatch } from "react-redux";
import { userApiService } from "../services";
import { UserProfile } from "../../../types";
import { setAvatarUrl, setBirthday, setEmail, setId, setNumberPhone, setUserName } from "../../actions/userProfile";

export const useUserStore = () => {
    const dispatch = useDispatch();

    async function getUserProfile() {
        try {
            const res = await userApiService._getOwnProfile();
            
            if (res.success) {
                const userProfileData: UserProfile = res.data as UserProfile;
                dispatch(setId(userProfileData.id));
                dispatch(setUserName(userProfileData.name));
                dispatch(setEmail(userProfileData.email));
                dispatch(setBirthday(userProfileData.birthday));
                dispatch(setNumberPhone(userProfileData.numberPhone));
                dispatch(setAvatarUrl(userProfileData.avatarUrl));
            }
        } catch (error) {
            console.error("Error getting user profile:", error);
        }
    }

    return {
        getUserProfile
    };
};
