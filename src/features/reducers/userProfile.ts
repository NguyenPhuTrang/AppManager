const userProfileReducer = (state = {
    name: "",
    email: "",
    birthday: "",
    numberPhone: "",
    avatarUrl: "",
}, action: any) => {
    switch (action.type) {
        case 'SETNAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SETEMAIL':
            return {
                ...state,
                email: action.payload
            };
        case 'SETBIRTHDAY':
            return {
                ...state,
                birthday: action.payload
            };
        case 'SETNUMBERPHONE':
            return {
                ...state,
                numberPhone: action.payload
            };
        case 'SETAVATARURL':
            return {
                ...state,
                avatarUrl: action.payload
            };
        default:
            return state;
    }
};

export default userProfileReducer;
