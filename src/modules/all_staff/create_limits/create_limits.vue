<template>
    <div class="air_block">

        <div class="control_block">
            <label for="">Выберите месяц и год
                <input type="month" v-model="date_limits" >
            </label>
        </div>
        <div class="table_block">
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th>Статья</th>
                        <th>Лимит</th>
                        <th>Сотрудники</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </div>
        <buttonComponent>Сохранить</buttonComponent>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import buttonComponent from "../../../ui/button/buttonComponent.vue";

const date_limits = ref("")

</script>


<style scoped>
@import url('./style/style.scss');
</style>