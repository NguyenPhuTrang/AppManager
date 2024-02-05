const initialState = {
    show: false,
    message: '',
    title: '',
    type: '',
};

const showToastReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_SHOW_STATE":
            return {
                ...state,
                show: action.payload
            };
        case "SET_MESSAGE_STATE":
            return {
                ...state,
                message: action.payload
            };
        case "SET_TITLE_STATE":
            return {
                ...state,
                title: action.payload
            };
        case "SET_TYPE_STATE":
            return {
                ...state,
                type: action.payload
            };
        default:
            return state;
    }
};

export default showToastReducer;
