const activeReducer = (state = false, action: any) => {
    switch (action.type) {
        case "ACTIVE":
            return !state;
        default:
            return state;
    }
};

export default activeReducer;