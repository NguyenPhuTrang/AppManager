const isCreateOrUpdateReducer = (state = '', action: any) => {
    switch (action.type) {
        case "IS_CREATE_OR_UPDATE":
            return action.payload;
        default:
            return state;
    }
};

export default isCreateOrUpdateReducer;