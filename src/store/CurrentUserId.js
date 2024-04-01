import { defineStore } from "pinia";

export const useCurrentUserId = defineStore("currentUserId", {
    state: () => ({
        current_user_id: 0
    }),
    actions:{
        setCurrentUserId(context){
            let token = JSON.parse(localStorage.getItem('accessToken'))
            const decodeJWT = (token) => {
                const parts = token.split('.');
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                const signature = parts[2];
                return { header, payload, signature };
              }
            const decoded = decodeJWT(token);
            this.current_user_id = decoded.payload.user_id;
        }
    }
})