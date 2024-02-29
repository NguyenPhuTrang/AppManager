export const setId = (id: any) => ({
    type: "SETID",
    payload: id
});

export const setUserName = (name: any) => ({
    type: "SETNAME",
    payload: name
});

export const setEmail = (email: any) => ({
    type: "SETEMAIL",
    payload: email
});

export const setBirthday = (birthday: any) => ({
    type: "SETBIRTHDAY",
    payload: birthday
});

export const setNumberPhone = (numberPhone: any) => ({
    type: "SETNUMBERPHONE",
    payload: numberPhone
});

export const setAvatarUrl = (avatarUrl: any) => ({
    type: "SETAVATARURL",
    payload: avatarUrl
}); 
