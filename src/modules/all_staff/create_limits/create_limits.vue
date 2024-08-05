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
                        <th style="width: 30%; background: #D6F5FF; cursor: pointer;"  @click="openSearch" ref="search_element">
                            <span v-show="!isSearch">Статья</span>
                            <input type="text" v-model="search" v-show="isSearch" placeholder="Поиск..." ref="search_input">
                        </th>
                        <th>Лимит, руб</th>
                        <th>Сотрудники</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody v-show="date_limits">
                    <tr v-for="item in filteredBalanceItems" :key="item.id">
                        <td style="width: 20% !important;">{{ item.name }}</td>
                        <td><input type="number" style="border: none; border-radius: 0;" v-model="item.limit"></td>
                        <td style="width: 30%;">
                            <v-select :id="item.id" v-model="selectedUsers[item.id]" :options="formatedUsers"
                                label="full_name" multiple style="height: 100%;"/>
                        </td>
                        <td>
                            <button @click="toggleSelectUsers(item.id)"  type="button"  class="btn btn-outline-dark  btn-sm" style="width: 100%; height: 100%">
                                {{ allSelected[item.id] ? 'Удалить всех' : 'Выбрать всех' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <buttonComponent @click="saveData" >Сохранить</buttonComponent>
    </div>
</template>

<script setup>
import { ref, watch, computed, reactive,nextTick  } from 'vue'
import buttonComponent from "../../../ui/button/buttonComponent.vue";
import { useBalanceItemsStore } from '@/store/BalanceItemsStore'
import { useLoaderStore } from '@/store/LoaderStore'
import api from '@/api/user'
import api_fin from '@/api/fin_report.js'

import { useGetAllUsers } from '@/store/AllUsers'
import { useToast } from "vue-toastification";
import { refreshToken } from '@/mixins/refreshToken'
import { onClickOutside } from '@vueuse/core'

const date_limits = ref("")
const balanceItemsStore = useBalanceItemsStore()
const balance_items = reactive(JSON.parse(JSON.stringify(balanceItemsStore.balance_items)).sort((a, b) => a.name.localeCompare(b.name)))
const all_users = ref([])
const selectedUsers = reactive({})
const allSelected = reactive({});
const toast = useToast();
const current_year_and_mount = new Date().toISOString().slice(0, 7)
const checkedLastLimit = ref(false)
const isSearch = ref(false)
const search = ref("")
const search_element = ref(null)
const search_input = ref(null)

const filteredBalanceItems = computed(() => {
    return balance_items.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))
})
const openSearch = async () => {
    isSearch.value = true
    await nextTick()
    search_input.value.focus()
}

onClickOutside(search_element, event =>  {
    search.value = ""
    if(isSearch.value) isSearch.value = false
    
})


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
    for (let item of balance_items) {
        limits.data.forEach((limit) => {
            if (item.name === limit.name_value) {
                item.limit = limit.limit
                // selectedUsers[item.id] = limit.users.map(userId => formatedUsers.value.find(user => user.id === userId))
            }
        })
    }
    toast.info(`Лимиты прошлого месяца установлены`, {
        timeout: 3500
    })
    console.log('лимиты: ', limits.data, 'balance_items: ', balance_items)
})



balance_items.forEach(item => {
  selectedUsers[item.id] = [];
  allSelected[item.id] = false;
});



const formatedUsers = computed(() => {
    return all_users.value.map(user => {
        return {
            full_name: user.last_name + " " + user.first_name,
            id: user.id
        }
    }).sort((a, b) => a.full_name.localeCompare(b.full_name))
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
function toggleSelectUsers(itemId) {
  if (allSelected[itemId]) {
    selectedUsers[itemId] = [];
  } else {
    selectedUsers[itemId] = formatedUsers.value.slice();
  }
  allSelected[itemId] = !allSelected[itemId];
}
async function saveData() {
    await refreshToken()
    let data = [];
    useLoaderStore().setLoader(true)
    // Разбиение где каждый клиент это отедльный запрос
    balance_items.forEach(item => {
        if (selectedUsers[item.id].length > 0) {
            selectedUsers[item.id].forEach(user => {
                data.push({
                    month: date_limits.value.split('-')[1],
                    year: date_limits.value.split('-')[0],
                    limit: item.limit,
                    comment: "",
                    user: user.id, // ID пользователя
                    item: item.id
                });
            });
        } 
    });


    try {
        let promises = data.map(item => api_fin.createNewTransactionLimits([item]))
        await Promise.all(promises)
        useLoaderStore().setLoader(false)

        toast.success(`Лимиты сохранены`, {
            timeout: 3500
        })
        date_limits.value = ""
    } catch (err) {
        useLoaderStore().setLoader(false)

        toast.error(`Ошибка сохранения лимитов\n${err}`, {
            timeout: 3500
        })
    } finally {
        useLoaderStore().setLoader(false)

    }
}
</script>


<style scoped>
@import url('./style/style.scss');
</style>