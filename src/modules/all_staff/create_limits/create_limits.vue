<template>
    <div class="air_block">

        <div class="control_block">
            <label for="">Выберите месяц и год
                <input type="month" v-model="date_limits">
            </label>
        </div>
        <div class="filter_block"  v-show="date_limits">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                 Подгрузить лимиты прошлого месяца
            </label>
        </div>
        <div class="table_block">
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th style="width: 40%;">Статья</th>
                        <th>Лимит</th>
                        <th>Сотрудники</th>
                    </tr>
                </thead>
                <tbody v-show="date_limits">
                    <tr v-for="item in balance_items" :key="item.id">
                        <td style="width: 40%;">{{ item.name }}</td>
                        <td><input type="number"></td>
                        <td style="width: 40%;">
                            <v-select :id="item.id" v-model="selectedUsers[item.id]" :options="formatedUsers"
                                label="full_name" multiple />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <buttonComponent>Сохранить</buttonComponent>
    </div>
</template>


<script setup>
import { ref, watch, computed, reactive } from 'vue'
import buttonComponent from "../../../ui/button/buttonComponent.vue";
import { useBalanceItemsStore } from '@/store/BalanceItemsStore'
import { useLoaderStore } from '@/store/LoaderStore'
import api from '@/api/user'
import { useToast } from "vue-toastification";
import { refreshToken } from '@/mixins/refreshToken'

const date_limits = ref("")
const balance_items = useBalanceItemsStore().balance_items.sort((a, b) => a.name.localeCompare(b.name))
const all_users = ref([])
const selectedUsers = reactive({})
const toast = useToast();

balance_items.forEach(item => {
    selectedUsers[item.id] = []
})
const name_user = computed(() => {
    return balance_items
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
    console.log(date_limits.value)
    try {
        useLoaderStore().setLoader(true)
        await refreshToken()
        let response = await api.getAllUsers()
        console.log(response.data)
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

</script>


<style scoped>
@import url('./style/style.scss');
</style>