const keywordReducer = (state = "", action: any) => {
    switch (action.type) {
        case "KEYWORD":
            return action.payload;
        default:
            return state;
    }
}

export default keywordReducer;