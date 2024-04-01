import { defineStore } from "pinia";

export const useCurrentUserId = defineStore("currentUserId", {
    store: {
        return: {
            currentUserId: 0
        }
    },
    actions:{
        setCurrentUserId(newVal){
            let token = JSON.parse(localStorage.getItem('accessToken'))
            const decodeJWT = (token) => {
                const parts = token.split('.');
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                const signature = parts[2];
                console.log(payload)
                return { header, payload, signature };
              }
            const decoded = decodeJWT(token);
            this.currentUserId = decoded.payload.userId;
        }
    }
})