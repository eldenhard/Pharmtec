import { defineStore } from "pinia";
import api from "@/api/user.js"

export const useGetAllUsers = defineStore("AllUsers", {
    state: () => ({
        all_users: [],
    }),
    actions: {
        async getAllUsers() {
            try {
                // await refreshToken()
                let response = await api.getAllUsers()

                let pre_data = response.data.map((item) => {
                    return {
                        ...item, // Сохраняем все остальные поля
                        full_name: item.last_name + " " + item.first_name + " " + item.middle_name
                    }
                }).sort((a, b) => a.full_name.localeCompare(b.full_name))
               
                this.all_users = pre_data
            } catch (err) {
                console.log(err)
            }
        }
    }
})
