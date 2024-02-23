export const setProfile = (user: any) => {
    return {
        type: "SET_PROFILE",
        payload: user,
    };
};