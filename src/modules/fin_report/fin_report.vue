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
                    <input type="value" v-model="inputValue" >
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Статья прихода / расхода</label>
                    <v-select v-model="_type_report" :options="expensesLabel" label="name"
                        style="min-width: 20vw; width: auto;" />
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Остаток по статье, ₽</label>
                    <input disabled :value="_type_report.amount">
                </div>
            </section>

            <Form @submit="saveFinReport">
                <Field name="_comment_transaction" v-slot="{ comment, errors }" :rules="validateComment">
                    <textarea rows="2" class="textarea" placeholder="Комментарий" v-model="_comment_transaction" v-bind="comment"></textarea>
                    <span class="error_message">{{ errors[0] }}</span>
                </Field>
                <buttonComponent type="submit" v-show="Number(_date_fin_report.split('-')[1]) == new Date().getMonth() + 1"> Сохранить</buttonComponent>
            </Form>
        </div>

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

import { Form, Field } from 'vee-validate'

export default {
    components: {
        buttonComponent,
        vSelect,
        new_mini_fin_report,
        Form,
        Field
    },
    setup() {
        const _date_fin_report = ref("")
        const _date_transaction = ref("new Date()")
        const _comment_transaction = ref("")
        const inputValue = ref('');
        const incomeLabel = []
        const $loader = useLoaderStore()
        const _type_report = ref("")
        const expensesLabel = [{ id: 1, name: "Авиабилеты, купленные в офисе", amount: 1000 },
        { id: 2, name: "Акция Любримакс Ретро", amount: 10500 },
        { id: 3, name: "Акция на закупку", amount: 114000 },
        { id: 4, name: "Акция на продажу из аптек", amount: 1000 },
        { id: 5, name: "Акция на продажу тестовых продуктов из аптек", amount: 10200 },
        { id: 6, name: "Акция стикеры", amount: 6000 },
        { id: 7, name: "Банкеты / конференции / доклады(лекции) / исследования", amount: 1000 },
        { id: 8, name: "Бензин за наличный расчет", amount: 1000 },
        { id: 9, name: "Визитки", amount: 1000 },
        { id: 10, name: "Возмещение за закуп новинок или ввод новинок", amount: 1000 },
        { id: 11, name: "Встречи с клиентами", amount: 1000 },
        { id: 12, name: "Выкуп продукции(кроме тестовых аптек)", amount: 1000 },
        { id: 13, name: "Выкуп продукции из тестовых аптек", amount: 1000 },
        { id: 14, name: "Гостиница, оплаченная в офисе", amount: 1000 },
        { id: 15, name: "Доставка рассылки(Деловые линии)", amount: 1000 },
        { id: 16, name: "Ж / д билеты, купленные в офисе", amount: 1000 },

        ]
        const amountRowFin = ref(0)
        const $toast = useToast();

        const user_id = localStorage.getItem('id')
        onMounted(() => {
            _date_transaction.value = new Date().toISOString().slice(0, 10)
        })


        const validateComment = (value) => {
            const formattedValue = parseFloat(inputValue.value.replace(/\s/g, ''));
            if (formattedValue > _type_report.value.amount) {
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
                author: user_id,
                month: _date_fin_report.value.slice(-2),
                year: _date_fin_report.value.slice(0, 4)
            }
            try {
                $loader.setLoader(true)
                let response = await api.getFinanialReports(queryParametrs)

                console.log(response.data)
                $toast.success("Отчеты загружены", {
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



        const saveFinReport = async () => {
            $loader.setLoader(true)
            await refreshToken()
            let queryParametrs = {
                on_date: _date_transaction.value,
                amount: inputValue.value,
                comment: _comment_transaction.value,
                // balance_sheet_item: _type_report.value.id
            }
            try{
                let response = await api.createNewTransaction(queryParametrs)
                console.log(response)
                $loader.setLoader(true)
            } catch(err){
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
           
            validateComment,
        };
    }
};
</script>