import { UserProfile } from "../../types";
import { SET_USER_PROFILE } from "../actions/userProfile";

const initialState: UserProfile = {
    name: "",
    email: "",
    birthday: "",
    numberPhone: "",
    avatarUrl: "",
};

const userProfileReducer = (state: UserProfile = initialState, action: { type: string; profile: UserProfile }) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                ...action.profile
            };
        default:
            return state;
    }
};

export default userProfileReducer;
