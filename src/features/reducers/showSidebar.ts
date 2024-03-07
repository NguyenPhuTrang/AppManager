const showSideBarReducer = (state = false, action: any) => {
    switch (action.type) {
        case "SHOW_SIDEBAR":
            return !state;
        default:
            return state;
    }
};

export default showSideBarReducer;