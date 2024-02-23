import { UserProfile } from "../../types";

const initialState: UserProfile = {
    name: "",
    email: "",
    birthday: "",
    numberPhone: "",
    avatarUrl: "",
};

export const userProfileReducer = (state: UserProfile = initialState, action: any) => {
    switch (action.type) {
        case "SET_PROFILE":
            return {
                ...state,
                ...action.profile
            };
        default:
            return state;
    }
};
