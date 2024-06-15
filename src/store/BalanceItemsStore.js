import { defineStore } from "pinia";
import api from "@/api/fin_report.js"
export const useBalanceItemsStore = defineStore("BalanceItemsStore", {
    state: () => ({
        balance_items: [],
    }),
    actions: {
        getAllBalanceItems(context){
            api.getBalanceItems()
            .then((response) => {
                this.balance_items = response.data
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
})