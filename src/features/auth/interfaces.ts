export type IBodyLogin = {
    email?: string;
    password?: string;
    // code?: string;
    // redirectUrl?: string;
}

export type ILoginResponse = {
    accessToken: string;
    expiresIn: number;
};