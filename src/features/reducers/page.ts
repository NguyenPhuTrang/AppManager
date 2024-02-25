const pageReducer = (state = { number: 1, totalPages: 0, limit: 10, totalData: 0 }, action: any) => {
    switch (action.type) {
        case "NUMBERPAGE":
            return {
                ...state,
                number: action.payload
            };
        case "TOTALDATA":
            return {
                ...state,
                totalData: action.payload
            };
        case "TOTALPAGE":
            return {
                ...state,
                totalPages: action.payload
            };
        case "LIMITPAGE":
            return {
                ...state,
                limit: action.payload
            };
        default:
            return state;
    }
};

export default pageReducer;
