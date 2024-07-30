<template>
    <div class="air_block">
        <h4 class="air_block_header">Подтверждение заявок</h4>
        <div class="air_block_body">
            <label for="" style="width: 50%;">Мои сотрудники
                <v-select  :options="formatedUsers" label="full_name"
                    v-model="currentUser_">
                    <template #no-options>
                        Сотрудники не найдены
                    </template>
                </v-select>
            </label>
            <br> <br>
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Дата</th>
                        <th>Наименование</th>
                        <th>Сумма</th>
                        <th>Комментарий сотрудника</th>
                        <th>Подтверждение</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in response_data_transaction_by_user_" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.on_date.split('-').reverse().join('.') }}</td>
                        <td>{{ item.balance_sheet_item_info.name }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.comment }}</td>
                        <td><input type="checkbox" @change="confirmFinEntry(item, index)"></td>
                        <td><input type="text" v-model="item.manager_comment"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import api from '@/api/user.js'
import api_fin from '@/api/fin_report.js'
import { onMounted, ref, watch, computed } from 'vue'
import { refreshToken } from '@/mixins/refreshToken'
export default {
    components: {
        vSelect
    },
    setup() {
        const allStaffByManager = ref([])
        const toast = useToast()
        const response_data_transaction_by_user_ = ref([])
        const currentUser_ = ref("")

        onMounted(async () => {
            try {
                await refreshToken()
                let response = await api.getAllUsers()
                allStaffByManager.value = response.data
            } catch (err) {
                console.log(err)
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                })
            }
        })
        watch(currentUser_, async () => {
            await getFinancialReports()
        })
        const formatedUsers = computed(() => {
            return allStaffByManager.value.map(user => {
                return {
                    full_name: user.last_name + " " + user.first_name,
                    id: user.id
                }
            }).sort((a, b) => a.full_name.localeCompare(b.full_name))
        })
        async function getFinancialReports() {
            try {
                if (currentUser_.value !== null) {
                    const queryParams = {
                        author: Number(currentUser_.value.id),
                        month: Number(new Date().getMonth() + 1),
                        year: Number(new Date().getFullYear())
                    }
                    let response = await api_fin.getFinancialReports(queryParams)
                    if (response.data.length > 0) {
                        toast.success(`Данные получены`, {
                            timeout: 2500
                        })
                        response_data_transaction_by_user_.value = response?.data[0]?.transactions.filter((item) => item.is_confirmed === false)
                        response_data_transaction_by_user_.value.forEach(item => item.manager_comment = "")
                    } else {
                        toast.warning(`Данные по выбранному пользователю отсутствуют`, {
                            timeout: 3000
                        })
                    }
                }
            } catch (err) {
                console.log(err)
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                })
            }
        }
        async function confirmFinEntry(item, index) {
            try {
                const queryParams = {
                    "balance_sheet_item": item?.balance_sheet_item_info.id,
                    "on_date": item.on_date,
                    "amount": item.amount,
                    "comment": item.manager_comment,
                    "is_confirmed": true,
                    "report": item.report
                }
                await api_fin.confirmFinancialEntry(item.id, queryParams)
                toast.success(`Заявка  подтверждена`, {
                    timeout: 2500
                })
                await getFinancialReports()
            } catch (err) {
                toast.error(`Ошибка! Заявка №${index + 1} не подтверждена\n${err.response.data}`, {
                    timeout: 3000
                })
            }
        }

        return {
            allStaffByManager,
            response_data_transaction_by_user_,
            currentUser_,
            confirmFinEntry,
            getFinancialReports,
            formatedUsers,
        }
    },
}
</script>

<style scoped>
@import './style/style_check_application.scss';
</style>
