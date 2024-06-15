<template>
    <div class="air_block">
        <!-- <h5><b> -->


        <!-- Финансовый отчет за период 01{{ new Date().toLocaleDateString().slice(2) }} - 29.02.{{ new
                    Date().getFullYear() }} -->
        <!-- </b></h5> -->

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
                    <v-select v-model="_type_report" :options="expensesLabel" label="name"
                        style="min-width: 20vw; width: auto;" />
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Остаток по статье, ₽</label>
                    <!-- <input disabled :value="_type_report.amount"> -->
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
        <early_transaction :data_fin_report="_response_data_fin_report"/>

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
            if (formattedValue > _type_report.value.amount) {
                if (!value) {
                    _commentField.value.focus()
                }
                return value ? true : 'Комментарий обязателен при превышении суммы остатка';
            }
            return true;
        };


        const countNewRowFin = () => {
            return amountRowFin.value++
        }
        watch(_date_fin_report, async () => {
            await refreshToken()
            let queryParametrs = {
                author: Number(user_id),
                month: Number(_date_fin_report.value.slice(-2)),
                year: Number(_date_fin_report.value.slice(0, 4))
            }
            try {
                $loader.setLoader(true)
                let response = await api.getFinanialReports(queryParametrs)
                if(response.data.length > 0){
                    _response_data_fin_report.value = response.data[0]
                    current_report_id = response.data[0].id
                }
                $toast.success("Транзакции по текущему месяцу загружены", {
                    timeout: 3000
                })
              
                $loader.setLoader(false)
            }
            catch (err) {
                $loader.setLoader(false)
                $toast.error(`${err}`, {
                    timeout: 4000
                })
            }

        })


        const saveFinReport = async (values) => {

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
                console.log(response)
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

            // $toast.info('Раздел в разработке. Сохранение невозможно', {
            //     timeout: 3000
            // })
        }
        return {
            _date_fin_report,
            amountRowFin,
            countNewRowFin,
            _type_report,
            incomeLabel,
            expensesLabel,
            saveFinReport,
            _date_transaction,
            _comment_transaction,
            _inputValue,
            validateComment,
            _commentField,
            _response_data_fin_report,
        };
    }
};
</script>