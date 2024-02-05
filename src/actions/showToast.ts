export const setShowToast = (show: boolean) => {
    return {
        type: "SET_SHOW_STATE",
        payload: show,
    };
};
export const setMessageToast = (message: string) => {
    return {
        type: "SET_MESSAGE_STATE",
        payload: message,
    };
};
export const setTitleToast = (title: string) => {
    return {
        type: "SET_TITLE_STATE",
        payload: title,
    };
};
export const setTypeToast = (type: string) => {
    return {
        type: "SET_TYPE_STATE",
        payload: type,
    };
};
