export const numberPage = (number: any) => {
    return {
        type: "NUMBERPAGE",
        payload: number,
    };
};

export const totalData = (product: any) => {
    return {
        type: "TOTALDATA",
        payload: product,
    };
}

export const totalPage = (total: any) => {
    return {
        type: "TOTALPAGE",
        payload: total,
    };
};

export const limitPage = (limit: any) => {
    return {
        type: "LIMITPAGE",
        payload: limit,
    };
};