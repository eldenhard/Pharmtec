import { defineStore } from "pinia";

export const useLoaderStore = defineStore('LoaderStore', {
    store: {
        return: {
            loader: false
        }
    },
    actions: {
        setLoader(newVal) {
            this.loader = newVal
        }
    }
})