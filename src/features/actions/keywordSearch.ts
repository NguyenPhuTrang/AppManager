export const setKeyword = (keyword: string) => {
    return {
        type: "KEYWORD",
        payload: keyword
    };
};