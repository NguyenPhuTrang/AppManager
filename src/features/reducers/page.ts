export const pageReducer = (state = { number: 1, totalPages: 0, limit: 10, totalProducts: 0 }, action: any) => {
    switch (action.type) {
        case "NUMBERPAGE":
            return {
                ...state,
                number: action.payload
            };
        case "TOTALPRODUCT":
            return {
                ...state,
                totalProducts: action.payload
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
