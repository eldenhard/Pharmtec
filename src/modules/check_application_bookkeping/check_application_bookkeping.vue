<template>
    <div class="air_block">
        <h4 class="air_block_header">Подтверждение заявок (бухгалетрия)</h4>
        <div class="air_block_body">
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>ФИО</th>
                        <th>Наименование</th>
                        <th>Сумма</th>
                        <th>Комментарий сотрудника</th>
                        <th>Подтверждение</th>
                        <th>Комментарий</th>
                        <th>Сохранение</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in allTransactions">
                        <tr v-for="j in item.transactions" :key="j.id">
                            <template v-if="!j.is_confirmed">
                                <td>{{ j.on_date.split("-").reverse().join(".") }}</td>
                                <td>{{ item.author.first_name }} {{ item.author.last_name }}</td>
                                <td>{{ j.balance_sheet_item_info.name }}</td>
                                <td>{{ j.amount }}</td>
                                <td>{{ j.staff_comment }}</td>
                                <td>
                                    <div class="dropdown" v-if="!j.status_confirm_application">
                                        <button class="btn btn-secondary dropdown-toggle" type="button"
                                            id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Действие
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#"
                                                    @click="j.status_confirm_application = 'Принято'">Принять</a></li>
                                            <li><a class="dropdown-item" href="#"
                                                    @click="j.status_confirm_application = 'Отклонено'">Отклонить</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <span v-if="j.status_confirm_application">{{ j.status_confirm_application }}</span>
                                </td>
                                <td :class="{ warning: j.status_confirm_application == 'Отклонено' }">
                                    <Field v-model="j.comment_bookkeeping" :name="`comment_${index}`"
                                        :rules="getValidationRules(j)" as="input" type="text" class="form-control" />
                                </td>
                                <td>
                                    <button type="button" class="btn btn-dark"
                                        @click="confirmFinEntry(j, index)">Сохранить</button>
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import api from '@/api/user.js'
import api_fin from '@/api/fin_report.js'
import { onMounted, ref, computed } from 'vue'
import { refreshToken } from '@/mixins/refreshToken'
import { useLoaderStore } from '@/store/LoaderStore'

export default {
    components: {
        vSelect,
        Field,
        ErrorMessage,
        Form,
    },
    setup() {
        const allStaffByManager = ref([]);
        const toast = useToast();
        const response_data_transaction_by_user_ = ref([]);
        const currentUser_ = ref("");
        const allTransactions = ref([]);

        onMounted(async () => {
            try {
                await refreshToken();
                useLoaderStore().setLoader(true);
                await getFinancialReports();
                let response = await api.getStaffByManagerUsers();
                allStaffByManager.value = response.data;
                useLoaderStore().setLoader(false);
            } catch (err) {
                console.log(err);
                useLoaderStore().setLoader(false);
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                });
            }
        });

        const formatedUsers = computed(() => {
            return allStaffByManager.value.map(user => {
                return {
                    full_name: user.user.fio,
                    id: user.user.id
                };
            }).sort((a, b) => a.full_name.localeCompare(b.full_name));
        });

        async function getFinancialReports() {
            try {
                if (currentUser_.value !== null) {
                    const queryParams = {
                        month: Number(new Date().getMonth() + 1),
                        year: Number(new Date().getFullYear())
                    };
                    let response = await api_fin.getFinancialReports(queryParams);
                    if (response.data.length > 0) {
                        toast.success(`Данные получены`, {
                            timeout: 2500
                        });

                        response.data.forEach((item) => {
                            allTransactions.value.push({ author: item.author_info, transactions: item.transactions });
                        });
                    } else {
                        toast.warning(`Данные по выбранному пользователю отсутствуют`, {
                            timeout: 3000
                        });
                    }
                }
            } catch (err) {
                console.log(err);
                toast.error(`Ошибка! Данные не получены`, {
                    timeout: 3000
                });
            }
        }

        function getValidationRules(transaction) {
            return transaction.status_confirm_application === 'Отклонено'
                ? yup.string().required('Комментарий обязателен при отклонении заявки.')
                : yup.string().nullable();
        }


        async function confirmFinEntry(item, index) {
            try {
                if (item.status_confirm_application === 'Отклонено' && !item.comment_bookkeeping) {
                    toast.warning('Комментарий обязателен при отклонении заявки.', {
                        timeout: 3000
                    });
                    return;
                }
                if (item.status_confirm_application === 'Согласовано') {
                    item.is_accounting_confirmed = true
                } else {
                    item.is_accounting_confirmed = false
                }

                console.log('item', item)
                // Логика сохранения транзакции
                const queryParams = {
                    "balance_sheet_item": item?.balance_sheet_item_info.id,
                    "on_date": item.on_date,
                    "amount": item.amount,
                    // "comment": item.comment,
                    "is_accounting_confirmed": true,
                    "report": item.report,
                    "accounting_comment": item.comment_bookkeeping,
                    'staff_comment': item.staff_comment
                }
                console.log('Параметры запроса:', queryParams);
                await api_fin.confirmFinancialEntry(item.id, queryParams)
                toast.success(`Действие по заявке сохранено`, {
                    timeout: 2500
                })
                await getFinancialReports()
            } catch (err) {
                toast.error(`Ошибка! Заявка №${index + 1} не подтверждена\n${err}`, {
                    timeout: 3000
                })
            }
        }
        return {
            allStaffByManager,
            response_data_transaction_by_user_,
            currentUser_,
            getFinancialReports,
            formatedUsers,
            allTransactions,
            getValidationRules,
            confirmFinEntry
        };
    },
};
</script>

<style scoped>
@import './style/style_check_application.scss';
</style>
