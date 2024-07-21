import { defineStore } from "pinia";
import api from "@/api/user.js"

export const useGetAllUsers = defineStore("AllUsers", {
    state: () => ({
        all_users: [],
    }),
    actions: {
        async getAllUsers() {
            try {
                await refreshToken()
                let response = await api.getAllUsers()
                this.all_users = response.data
            } catch (err) {
                console.log(err)
            }
        }
    }
})