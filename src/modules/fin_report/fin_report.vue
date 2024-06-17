<template>
    <div class="air_block">

        <label for="">Выберите месяц и год отчета
            <input type="month" v-model="_date_fin_report">
        </label>
        <div class="air_block_body" v-show="Number(_date_fin_report.split('-')[1]) == new Date().getMonth() + 1">

            <section class="enterdata">
                <div class="input-box">
                    <label style="font-size: 13px;">Дата</label>
                    <input type="date" v-model="_date_transaction">
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Сумма, ₽</label>
                    <input type="number" v-model="_inputValue">
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Статья прихода / расхода</label>
                    <v-select v-model="_type_report" :options="expensesLabelLimit" label="name"
                        style="min-width: 20vw; width: auto;" />
                </div>
                <div class="input-box" v-show="_type_report.limit">
                    <label style="font-size: 13px;">Остаток по статье, ₽</label>
                    <input disabled :value="remainceForItemsTransaction">
                </div>
                <div class="input-box"  v-show="_type_report.limit">
                    <label style="font-size: 13px;">Лимит по статье, ₽</label>
                    <input :value="_type_report.limit" disabled>
                    <!-- <pre>{{ _type_report }}</pre> -->
                </div>
            </section>

            <Form @submit="saveFinReport">
                <Field name="_comment_transaction" v-slot="{ field, errors }" :rules="validateComment">
                    <textarea rows="2" class="textarea" placeholder="Комментарий" ref="_commentField"
                        v-model="_comment_transaction" v-bind="field"></textarea>
                    <span class="error_message">{{ errors[0] }}</span>
                </Field>
                <buttonComponent type="submit"
                    v-show="Number(_date_fin_report.split('-')[1]) == new Date().getMonth() + 1"> Сохранить
                </buttonComponent>
            </Form>

            <br>
        </div>
        <early_transaction :data_fin_report="_response_data_fin_report" />
    </div>
</template>

<style scoped>
@import './style/style-fin-report.scss';
</style>

<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import { ref, computed, watch, onMounted } from 'vue'
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import new_mini_fin_report from './modules/new_mini_fin_report.vue'
import api from '@/api/fin_report.js'
import { useLoaderStore } from '@/store/LoaderStore'
import { refreshToken } from '@/mixins/refreshToken'
import { useBalanceItemsStore } from '@/store/BalanceItemsStore'
import { Form, Field } from 'vee-validate'
import early_transaction from './modules/early_transaction.vue';
export default {
    components: {
        buttonComponent,
        vSelect,
        new_mini_fin_report,
        Form,
        Field,
        early_transaction,
    },
    setup() {
        const _date_fin_report = ref("")
        const _date_transaction = ref("new Date()")
        const _comment_transaction = ref("")
        const _inputValue = ref(0);
        const incomeLabel = []
        const $loader = useLoaderStore()
        const _type_report = ref("")
        const _commentField = ref(null)
        const expensesLabel = ref(useBalanceItemsStore().balance_items)
        const expensesLabelLimit = ref("")
        const _response_data_fin_report = ref([])
        const amountRowFin = ref(0)
        const $toast = useToast();

        const user_id = localStorage.getItem('id')

        let current_report_id = 0

        onMounted(() => {
            _date_transaction.value = new Date().toISOString().slice(0, 10)
        })

        const validateComment = (value) => {
            const formattedValue = _inputValue.value
            if (formattedValue > _type_report.value.limit) {
                if (!value) {
                    _commentField.value.focus()
                }
                return value ? true : 'Комментарий обязателен при превышении суммы остатка или лимита';
            }
            return true;
        };

        const countNewRowFin = () => {
            return amountRowFin.value++
        }
        // Получаем данные по текущему месяцу
        watch(_date_fin_report, async () => {
            await refreshToken()
            try {
                $loader.setLoader(true)
                const queryParams = {
                    author: Number(user_id),
                    month: Number(_date_fin_report.value.slice(-2)),
                    year: Number(_date_fin_report.value.slice(0, 4))
                }

                const [response, limits] = await Promise.all([
                    api.getFinancialReports(queryParams),
                    api.getTransactionsLimits(queryParams)
                ])

                if (response.data.length > 0) {
                    const transactions = response.data[0].transactions
                    const limitsData = limits.data

                    transactions.forEach(transaction => {
                        const match = limitsData.find(limit => limit.item === transaction.balance_sheet_item_info.id)
                        transaction.limit = match?.limit ?? null
                        transaction.name = transaction.balance_sheet_item_info.name
                    })
                    // Создаем массив уникальных элементов на основе свойства 'name' каждого объекта в массиве 'transactions'.
                    // Для каждого уникального элемента мы находим соответствующий объект в исходном массиве 'transactions'.
                    // Результат сохраняем в 'uniqueTransactions'.
                    const uniqueTransactions = Array.from(
                        new Set(transactions.map(transaction => transaction.name)),
                        name => transactions.find(transaction => transaction.name === name)
                    )

                    expensesLabelLimit.value = uniqueTransactions
                    _response_data_fin_report.value = transactions
                    current_report_id = response.data[0].id
                } else {
                    _response_data_fin_report.value = []
                }

                $toast.success("Транзакции по текущему месяцу загружены", { timeout: 3000 })
                $loader.setLoader(false)
            } catch (err) {
                $loader.setLoader(false)
                $toast.error(`${err}`, { timeout: 4000 })
            }
        })
        const remainceForItemsTransaction = computed(() => {
            let arraySumByItemTransaction = _response_data_fin_report.value.reduce((acc, item) => {
                if(item.name === _type_report.value.name){
                    acc += item.amount
                }
                return acc
            }, 0)
          return _type_report.value?.limit - arraySumByItemTransaction
        })

        const saveFinReport = async () => {
            $loader.setLoader(true)
            await refreshToken()
            let queryParametrs = {
                on_date: _date_transaction.value,
                amount: _inputValue.value,
                comment: _comment_transaction.value,
                balance_sheet_item: _type_report.value.id,
                report: current_report_id
                // balance_sheet_item: _type_report.value.id
            }
            try {
                let response = await api.createNewTransaction(queryParametrs)
                $loader.setLoader(false)
                $toast.success("Транзакция создана", {
                    timeout: 3000
                })
            } catch (err) {
                $loader.setLoader(false)
                $toast.error(`${err}`, {
                    timeout: 4000
                })
            }
        }

        return {
            _date_fin_report,
            amountRowFin,
            countNewRowFin,
            _type_report,
            incomeLabel,
            expensesLabel,
            expensesLabelLimit,
            saveFinReport,
            _date_transaction,
            _comment_transaction,
            _inputValue,
            validateComment,
            _commentField,
            _response_data_fin_report,
            remainceForItemsTransaction,
        };
    }
};
</script>