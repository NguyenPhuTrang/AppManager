const showSideBarReducer = (state = false, action: any) => {
    switch (action.type) {
        case "SHOW_SIDEBAR":
            return action.payload;
        default:
            return state;
    }
};

export default showSideBarReducer;