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
                    <input type="date" name="" id="">
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Тип</label>
                    <select v-model="typeFinReport">
                        <option value="false">-</option>
                        <option value="true">+</option>
                    </select>
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Сумма, ₽</label>
                    <input type="value" v-model="formattedInput" @input="formatInput">
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Статья прихода / расхода</label>
                    <v-select :options="typeValExpesesOrIncome" label="name" style="min-width: 20vw; width: auto;" />

                </div>
                <div class="input-box">
                    <br>
                    <button type="button" class="btn btn-success" @click="countNewRowFin()"><i
                            class="bi bi-plus-lg"></i></button>

                </div>
            </section>
            <textarea rows="2" class="textarea" placeholder="Комментарий"></textarea>
        </div>
        <!-- <new_mini_fin_report :amountNewRowFin="amountRowFin" /> -->
        <!-- <buttonComponent @click="saveFinReport()">Сохранить</buttonComponent> -->
    </div>
</template>

<style scoped>
@import './style/style-fin-report.scss';
</style>



<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import { ref, computed, watch } from 'vue'
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import new_mini_fin_report from './modules/new_mini_fin_report.vue'
import api from '@/api/fin_report.js'
import { useLoaderStore } from '@/store/LoaderStore'
export default {
    components: {
        buttonComponent,
        vSelect,
        new_mini_fin_report
    },
    setup() {
        const _date_fin_report = ref("")
        const inputValue = ref('');
        const incomeLabel = []
        const $loader = useLoaderStore()
        const expensesLabel = [{ name: "Авиабилеты, купленные в офисе", },
        { name: "Акция Любримакс Ретро", },
        { name: "Акция на закупку", },
        { name: "Акция на продажу из аптек", },
        { name: "Акция на продажу тестовых продуктов из аптек", },
        { name: "Акция стикеры", },
        { name: "Банкеты / конференции / доклады(лекции) / исследования", },
        { name: "Бензин за наличный расчет", },
        { name: "Визитки", },
        { name: "Возмещение за закуп новинок или ввод новинок", },
        { name: "Встречи с клиентами", },
        { name: "Выкуп продукции(кроме тестовых аптек)", },
        { name: "Выкуп продукции из тестовых аптек", },
        { name: "Гостиница, оплаченная в офисе", },
        { name: "Доставка рассылки(Деловые линии)", },
        { name: "Ж / д билеты, купленные в офисе", },
        { name: "Канцелярские товары / Хозяйственные товары", },
        { name: "Клуб специалистов ФАРМТЕК", },
        { name: "Командировки / служебные поездки(билеты на самолет / поезд / автобус)", },
        { name: "Командировки / служебные поездки(проживание)", },
        { name: "Командировки / служебные поездки(суточные)", },
        { name: "Командировки / служебные поездки(такси)", },
        { name: "Компенсация за использование личного автомобиля", },
        { name: "Лидеры мнения", },
        { name: "НЕ использовать.Акция(прочие)", },
        { name: "Обеды", },
        { name: "Оплата отчетов по продажам", },
        { name: "Отчеты по продажам", },
        { name: "Перевод денежных средств сотруднику", },
        { name: "Подарки для врачей, провизоров, бизнес - партнеров", },
        { name: "Почтовые расходы", },
        { name: "Разовые выплаты", },
        { name: "Распечатка и ксерокопирование", },
        { name: "Расходы на лектора", },
        { name: "Расходы на медицинские осмотры", },
        { name: "Расходы на  неаптечную  розницу", },
        { name: "Расходы на общественный транспорт", },
        { name: "Расходы на оформление визы", },
        { name: "Расходы на содержание автомобиля(автомойка)", },
        { name: "Расходы на содержание автомобиля(расходные материалы и  запчасти)", },
        { name: "Расходы на содержание автомобиля(стоянка / парковка / платная дорога)", },
        { name: "Расходы на содержание автомобиля(шины / шиномонтаж)", },
        { name: "Расходы, связанные с планшетами", },
        { name: "Сотовая связь, интернет", },
        { name: "Услуги сторонних организаций", },
        { name: "Фармкружок / Круглый стол", },
        ]
        const amountRowFin = ref(0)
        const typeFinReport = ref(Boolean)
        const $toast = useToast();

        const user_id = localStorage.getItem('id')
        const typeValExpesesOrIncome = computed(() => {
            return typeFinReport.value == 'false' ? expensesLabel : incomeLabel
        })
        const formatInput = (event) => {
            // Удаление всех пробелов из введенного значения
            let value = event.target.value.replace(/\s/g, '');
            // Форматирование числа с разделением на тысячи пробелами
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            // Обновление значения в компоненте
            inputValue.value = value;
        };

        // Привязка отформатированного значения к переменной formattedInput
        const formattedInput = computed(() => inputValue.value);
        const countNewRowFin = () => {
            return amountRowFin.value++
        }
        watch(_date_fin_report, async () => {
            console.log(Number(_date_fin_report.value.split('-')[1]), new Date().getMonth() + 1)
            let queryParametrs = {
                author: user_id,
                month: _date_fin_report.value.slice(-2),
                year: _date_fin_report.value.slice(0, 4)
            }
            try{
                $loader.setLoader(true)
                let response = await api.getFinanialReports(queryParametrs)

                console.log(response.data)
                $toast.success("Отчеты загружены", {
                    timeout: 3000
                })
                $loader.setLoader(false)
            }
            catch (err){
                $loader.setLoader(false)
                $toast.error(`${err}`, {
                    timeout: 4000
                })
            }
           
        })
        const saveFinReport = () => {
            $toast.info('Раздел в разработке. Сохранение невозможно', {
                timeout: 3000
            })
        }
        return {
            _date_fin_report,
            amountRowFin,
            countNewRowFin,
            formattedInput,
            formatInput,
            typeValExpesesOrIncome,
            typeFinReport,
            incomeLabel,
            expensesLabel,
            saveFinReport,
        };
    }
};
</script>