<template>
    <div class="air_block">
        <h4 class="air_block_header">Подтверждение заявок</h4>
        <div class="air_block_body">
            <label for="" style="width: 50%;">Мои сотрудники
                <v-select :options="allStaffByManager" label="email" v-model="currentUser_" />
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
                    <tr v-for="item, index in response_data_transaction_by_user_" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.on_date.split('-').reverse().join('.') }}</td>
                        <td>{{ item.balance_sheet_item_info.name }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.comment }}</td>

                        <td><input type="checkbox"></td>
                        <td><input type="text"></td>
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
import apiFin from '@/api/fin_report.js'
import { onMounted, ref, watch } from 'vue'
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
                let queryParams = {
                    department_info: {
                        id: 3,
                        manager: "Кораблева Екатерина Георгиевна"
                    }
                }
                let response = await api.getAllUsers(queryParams)
                allStaffByManager.value = response.data
            } catch (err) {
                console.log(err)
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                })
            }
        })
        watch(currentUser_, async () => {
            try {
                if (currentUser_.value !== null) {
                    const queryParams = {
                        author: Number(currentUser_.value.id),
                        month: Number(new Date().getMonth() + 1),
                        year: Number(new Date().getFullYear())
                    }
                    let response = await apiFin.getFinancialReports(queryParams)
                    if (response.data.length > 0) {
                        toast.success(`Данные получены`, {
                            timeout: 2500
                        })
                        response_data_transaction_by_user_.value = response?.data[0]?.transactions.filter((item) => item.is_confirmed === false)
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
        })
        return {
            allStaffByManager,
            response_data_transaction_by_user_,
            currentUser_
        }
    },
}
</script>


<style scoped>
@import './style/style_check_application.scss';
</style>