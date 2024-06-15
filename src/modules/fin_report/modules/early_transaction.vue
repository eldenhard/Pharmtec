<template>
    <div>

        <h4 >Транзакции за текущий месяц</h4>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Наименование</th>
                    <th>Сумма</th>
                    <th>Комментарий</th>
                    <th>Подтверждение</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data_fin_report.transactions" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.balance_sheet_item_info.name }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.comment }}</td>
                    <td>{{ item.is_confirmed }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        data_fin_report: {
            type: Array
        }
    },
    setup() {

        return {

        }
    },
}
</script>