<template>
    <div class="air_block">
        <div class="header_element">
            <section>
                <span class="description">Финансовый отчет сотрудника: </span>
                <span>
                    {{ info_about_fin_report[0]?.author_info.last_name }}
                    {{ info_about_fin_report[0]?.author_info.first_name }}
                </span>
            </section>
            <section>
                <span>Остаток на начало: {{ formatAmount(info_about_fin_report[0]?.balance_on_begin) }} ₽</span>
                <span>Остаток на конец: {{ formatAmount(info_about_fin_report[0]?.balance_on_end) }} ₽</span>
            </section>
        </div>
        <hr>

        <div class="f_block" style="display: flex; justify-content: space-between">
            <label for="">Выберите месяц и год отчета
                <input type="month" v-model="date_fin_report_">
            </label>
            <span style="color: grey; cursor: pointer"
             @click="isEnterData = !isEnterData"
             v-if="Number(date_fin_report_.split('-')[1]) !== new Date().getMonth()"
             >
             {{isEnterData ? 'Свернуть' : 'Развернуть'}}</span>
        </div>
        <div class="air_block_body" v-show="Number(date_fin_report_.split('-')[1]) == new Date().getMonth() + 1 && isEnterData">

            <section class="enterdata">
                <div class="input-box">
                    <label style="font-size: 13px;">Дата</label>
                    <input type="date" v-model="date_transaction_">
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Сумма, ₽</label>
                    <input type="number" v-model="inputValue_">
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Статья прихода / расхода</label>
                    <v-select v-model="type_report_" :options="expensesLabelLimit" label="name"
                        style="min-width: 20vw; width: auto;" />
                </div>
                <!-- <div class="input-box" v-if="type_report_?.limit">
                    <label style="font-size: 13px;">Остаток по статье, ₽</label>
                    <input disabled :value="remainceForItemsTransaction">
                </div> -->
                <div class="input-box" v-if="type_report_?.limit">
                    <label style="font-size: 13px;">Лимит по статье, ₽</label>
                    <input :value="type_report_.limit" disabled>
                </div>
            </section>

            <Form @submit="saveFinReport">
                <Field name="comment_transaction_" v-slot="{ field, errors }" :rules="validateComment">
                    <textarea rows="2" class="textarea" placeholder="Комментарий" ref="commentField_"
                        v-model="comment_transaction_" v-bind="field"></textarea>
                    <span class="error_message">{{ errors[0] }}</span>
                </Field>
                <buttonComponent type="submit"
                    v-show="Number(date_fin_report_.split('-')[1]) == new Date().getMonth() + 1"> Сохранить
                </buttonComponent>
            </Form>

            <br>
        </div>
        <early_transaction :data_fin_report="response_data_fin_report_" />
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
        const date_fin_report_ = ref("")
        const date_transaction_ = ref("new Date()")
        const comment_transaction_ = ref("")
        const inputValue_ = ref(0);
        const incomeLabel = []
        const $loader = useLoaderStore()
        const type_report_ = ref("")
        const commentField_ = ref(null)
        const expensesLabel = ref(useBalanceItemsStore().balance_items)
        const expensesLabelLimit = ref([])
        const response_data_fin_report_ = ref([])
        const amountRowFin = ref(0)
        const $toast = useToast();
        const info_about_fin_report = ref([])
        const isEnterData = ref(false)
        
        const user_id = localStorage.getItem('id')

        let current_report_id = 0

        onMounted(() => {
            date_transaction_.value = new Date().toISOString().slice(0, 10)
        })
        const formatAmount = (value) => {
         
            if (value != "" && !!value) {
                if (Number.isFinite(value)) {
                    let TwoSignNum = value?.toFixed(0)
                    return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                } else {
                    return 0;
                }
            }
            return value
        }
        const validateComment = (value) => {
            if (type_report_.value.name == 'Прочие расходы (с комментариями)') {
                console.log('123')
                if (!value) {
                    commentField_.value.focus()
                }
                return value ? true : 'Комментарий обязателен для выбранной статьи';

            }

            if (!type_report_.value.limit) return true
            const formattedValue = inputValue_.value
            if (formattedValue > type_report_.value.limit ) {

                if (!value) {
                    commentField_.value.focus()
                }
                return value ? true : 'Комментарий обязателен при превышении суммы остатка или лимита';
            }

            return true;
        };

        const countNewRowFin = () => {
            return amountRowFin.value++
        }
        // Получаем данные по текущему месяцу
        watch(date_fin_report_, async () => {
            await getFinReport()
        })

        // Получение данных по отчету и приведение транзакций
        const getFinReport = async () => {
            await refreshToken()
            try {
                $loader.setLoader(true)
                response_data_fin_report_.value = []
                info_about_fin_report.value = []
                const queryParams = {
                    author: Number(user_id),
                    month: Number(date_fin_report_.value.slice(-2)),
                    year: Number(date_fin_report_.value.slice(0, 4))
                }

                const [response, limits] = await Promise.all([
                    api.getFinancialReports(queryParams),
                    api.getTransactionsLimits(queryParams)
                ])
                info_about_fin_report.value = response.data
                if (response.data.length == 0) {
                    $loader.setLoader(false)
                    $toast.error('Финансовый отчет не найден.\nСообщите в тех.поддержку', {
                        timeout: 3500
                    })
                    return
                }


                if (response.data.length > 0) {
                    const transactions = response.data[0].transactions
                    const limitsData = limits.data

                    expensesLabel.value.forEach(balanceSheetItem => {
                        const match = limitsData.find(limit => limit.item === balanceSheetItem.id)
                        balanceSheetItem.limit = match?.limit ?? null
                        balanceSheetItem.name = balanceSheetItem.name
                    })
                    // Создаем массив уникальных элементов на основе свойства 'name' каждого объекта в массиве 'expensesLabel.value'.
                    // Для каждого уникального элемента мы находим соответствующий объект в исходном массиве 'expensesLabel.value'.
                    // Результат сохраняем в 'uniqueTransactions'.
                    const uniqueTransactions = Array.from(
                        new Set(expensesLabel.value.map(transaction => transaction.name)),
                        name => expensesLabel.value.find(transaction => transaction.name === name)
                    )
                    expensesLabelLimit.value = uniqueTransactions.sort((a, b) => a.name.localeCompare(b.name))
                    response_data_fin_report_.value = transactions
                    current_report_id = response.data[0].id


                } else {
                    response_data_fin_report_.value = [],
                        expensesLabelLimit.value = expensesLabel.value.sort((a, b) => a.name.localeCompare(b.name))
                }
                $toast.success("Данные загружены", { timeout: 3000 })
                $loader.setLoader(false)
            } catch (err) {
                $loader.setLoader(false)
                $toast.error(`${err}`, { timeout: 4000 })
            }
        }


        const saveFinReport = async () => {
            $loader.setLoader(true)
            await refreshToken()
            try {
                let queryParametrs = {
                    on_date: date_transaction_.value,
                    amount: inputValue_.value,
                    staff_comment: comment_transaction_.value,
                    balance_sheet_item: type_report_.value.id,
                    report: current_report_id
                    // balance_sheet_item: type_report_.value.id
                }
                let response = await api.createNewTransaction(queryParametrs)
                $loader.setLoader(false)
                await getFinReport()
                $toast.info("Транзакция создана", {
                    timeout: 3000
                })
                inputValue_.value = 0
                type_report_.value = ""
                comment_transaction_.value = ""
            } catch (err) {
                $loader.setLoader(false)
                $toast.error(`${err}`, {
                    timeout: 4000
                })
            } finally {
                $loader.setLoader(false)
            }
        }


        return {
            date_fin_report_,
            amountRowFin,
            countNewRowFin,
            type_report_,
            incomeLabel,
            expensesLabel,
            expensesLabelLimit,
            saveFinReport,
            getFinReport,
            date_transaction_,
            comment_transaction_,
            inputValue_,
            validateComment,
            commentField_,
            response_data_fin_report_,
            info_about_fin_report,
            formatAmount,
            isEnterData,
        };
    }
};
</script>