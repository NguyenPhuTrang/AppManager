export const setIsCreatOrUpdate = (str: any) => {
    return {
        type: "IS_CREATE_OR_UPDATE",
        payload: str,
    };
};