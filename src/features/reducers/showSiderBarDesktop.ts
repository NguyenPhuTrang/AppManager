const showSideBarDesktopReducer = (state = true, action: any) => {
    switch (action.type) {
        case "SHOW_SIDEBAR_DESKTOP":
            return action.payload;
        default:
            return state;
    }
};

export default showSideBarDesktopReducer;