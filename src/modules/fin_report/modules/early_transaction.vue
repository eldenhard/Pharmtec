<template>
    <div>
<br>
        <div style="max-height: 45vh; overflow: auto;">
            <br>
            <table class="table table-bordered table-hover table-sm">
                
                <thead>
                    <tr>
                        <th></th>
                        <th>Дата</th>
                        <th>Наименование</th>
                        <th>Сумма</th>
                        <th>Комментарий</th>
                        <th>Подтверждение</th>
                        <th>Подтверждение бух.</th>
                        <th>Коммент. бух.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data_fin_report" :key="item.id" :class="{notConfirm: !item.is_confirmed}">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.on_date.split('-').reverse().join(".") }}</td>
                        <td>{{ item.balance_sheet_item_info.name }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.comment }}</td>
                        <td>{{ item.is_confirmed ? 'Согласовано' : 'Не согласовано' }}</td>
                        <td>{{ item.is_accounting_confirmed ? 'Согласовано' : 'Не согласовано' }}</td>
                        <td>{{ item.accounting_comment  }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Транзакции за выбранный месяц</p>
    </div>
</template>

<script>
import { watch } from 'vue';
export default {
    props: {
        data_fin_report: {
            type: Array, Object
        }
    },
    setup() {
        // watch(data_fin_report, () => {
        //         data_fin_report.value.sort((a, b) => a.on_date.localeCompare(b.on_date))
        //     })
        return {
         
        }
    },
}
</script>

<style scoped>
@import '../style/style-fin-report.scss';
</style>