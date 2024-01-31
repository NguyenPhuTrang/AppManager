import { IBodyLogin } from "../auth/interfaces";
import { authApi } from "../auth/services";

export const useAuthStore = () => {
    async function login(body :IBodyLogin) {
        console.log(body);
        
        const res = await authApi.login(body);
        // if(res.success) {

        // } 
        return res;
    }
    return {
        login
    }
}