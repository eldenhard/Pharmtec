<template>
    <div>
        <br>
        <table class="table table-bordered table-hover table-sm">
            <caption>Транзакции за текущий месяц</caption>
            <thead>
                <tr>
                    <th></th>
                    <th>Дата</th>
                    <th>Наименование</th>
                    <th>Сумма</th>
                    <th>Комментарий</th>
                    <th>Подтверждение</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data_fin_report" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.on_date.split('-').reverse().join(".") }}</td>
                    <td>{{ item.balance_sheet_item_info.name }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.comment }}</td>
                    <td>{{ item.is_confirmed ? 'Согласовано' : 'Не согласовано' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        data_fin_report: {
            type: Array, Object
        }
    },
    setup() {

        return {

        }
    },
}
</script>

<style scoped>
@import '../style/style-fin-report.scss';
</style>