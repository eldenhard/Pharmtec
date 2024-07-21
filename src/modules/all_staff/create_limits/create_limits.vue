<template>
    <div class="air_block">

        <div class="control_block">
            <label for="">Выберите месяц и год
                <input type="month" v-model="date_limits" :min="current_year_and_mount">
            </label>
        </div>
        <div class="filter_block" v-show="date_limits">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="checkedLastLimit">
            <label class="form-check-label" for="flexCheckDefault">
                Подгрузить лимиты прошлого месяца
            </label>
        </div>
        <div class="table_block">
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th style="width: 40%;">Статья</th>
                        <th>Лимит, руб</th>
                        <th>Сотрудники</th>
                    </tr>
                </thead>
                <tbody v-show="date_limits">
                    <tr v-for="item in balance_items" :key="item.id">
                        <td style="width: 40%;">{{ item.name }}</td>
                        <td><input type="number" style="border: none; border-radius: 0;" v-model="item.limit"></td>
                        <td style="width: 40%;">
                            <v-select :id="item.id" v-model="selectedUsers[item.id]" :options="formatedUsers"
                                label="full_name" multiple />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <buttonComponent @click="saveData" disabled>Сохранить</buttonComponent>
    </div>
</template>

<script setup>
import { ref, watch, computed, reactive } from 'vue'
import buttonComponent from "../../../ui/button/buttonComponent.vue";
import { useBalanceItemsStore } from '@/store/BalanceItemsStore'
import { useLoaderStore } from '@/store/LoaderStore'
import api from '@/api/user'
import api_fin from '@/api/fin_report.js'

import {useGetAllUsers} from '@/store/AllUsers'
import { useToast } from "vue-toastification";
import { refreshToken } from '@/mixins/refreshToken'


const date_limits = ref("")
const balanceItemsStore = useBalanceItemsStore()
const balance_items = reactive(JSON.parse(JSON.stringify(balanceItemsStore.balance_items)).sort((a, b) => a.name.localeCompare(b.name)))
const all_users = ref([])
const selectedUsers = reactive({})
const toast = useToast();
const current_year_and_mount = new Date().toISOString().slice(0, 7)
const checkedLastLimit = ref(false)

watch(checkedLastLimit, async () => {
    if (!checkedLastLimit.value) {
        toast.info(`Лимиты прошлого месяца сброшены`, {
        timeout: 3500
    })
        balance_items.forEach((item) => {
            delete item.limit
        })
        return
    }
    const queryParams = {
        month: Number(date_limits.value.slice(-2) - 1),
        year: Number(date_limits.value.slice(0, 4))
    }
    const limits = await api_fin.getTransactionsLimits(queryParams)

    limits.data.forEach((item) => {
        item.name_value = balance_items.find((val) => val.id === item.item).name
    })
    for(let item of balance_items){
        limits.data.forEach((limit) => {
            if(item.name === limit.name_value){
                item.limit = limit.limit
                console.log('проверка на юзера', limit, all_users.value)
                // selectedUsers[item.id] = limit.users.map(userId => formatedUsers.value.find(user => user.id === userId))
            }
        })
    }
    toast.info(`Лимиты прошлого месяца установлены`, {
        timeout: 3500
    })
    console.log('лимиты: ',limits.data, 'balance_items: ', balance_items)
})



balance_items.forEach(item => {
    selectedUsers[item.id] = []
})



const formatedUsers = computed(() => {
    return all_users.value.map(user => {
        return {
            full_name: user.last_name + " " + user.first_name,
            id: user.id
        }
    })
})

watch(date_limits, async () => {
    checkedLastLimit.value = false
    balance_items.forEach((item, index) => {
        delete item.limit
    })
    try {
        useLoaderStore().setLoader(true)
        await refreshToken()
        let response = await api.getAllUsers()

        all_users.value = response.data
        useLoaderStore().setLoader(false)
    } catch (err) {
        useLoaderStore().setLoader(false)
        toast.error(`Ошибка! Данные не получены\n${err}`, {
            timeout: 3500
        })
    } finally {
        useLoaderStore().setLoader(false)
    }
})

function saveData() {
    console.log(selectedUsers)
}
</script>


<style scoped>
@import url('./style/style.scss');
</style>