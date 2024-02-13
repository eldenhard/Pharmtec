<template>
    <div class="air_block">
        <h5><b>
                Финансовый отчет за период 01.02.2024 - 29.02.2024
            </b></h5>
        <div class="air_block_body">

            <section class="enterdata">
                <div class="input-box">
                    <label>Дата</label>
                    <input type="date" name="" id="">
                </div>
                <div class="input-box">
                    <label>Тип</label>
                    <select>
                        <option value="">-</option>
                        <option value="">+</option>
                    </select>
                </div>
                <div class="input-box">
                    <label>Сумма, ₽</label>
                    <input type="value" v-model="formattedInput" @input="formatInput">
                </div>
                <div class="input-box">
                    <label>Статья прихода / расхода</label>
                    <select>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
                <div class="input-box">
                    <br>
                    <button type="button" class="btn btn-success"><i class="bi bi-plus-lg"></i></button>

                </div>
            </section>
            <textarea rows="3" class="textarea" placeholder="Комментарий"></textarea>
        </div>
        <buttonComponent>Сохранить</buttonComponent>
    </div>
</template>

<style scoped>
@import './style/style-fin-report.scss';
</style>



<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import { ref,computed } from 'vue'
export default {
    components: {
        buttonComponent,
    },
    setup() {
        const inputValue = ref('');

        const formatInput = (event) => {
            // Удаление всех пробелов из введенного значения
            let value = event.target.value.replace(/\s/g, '');
            // Форматирование числа с разделением на тысячи пробелами
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            // Обновление значения в компоненте
            inputValue.value = value;
        };

        // Привязка отформатированного значения к переменной formattedInput
        const formattedInput = computed(() => inputValue.value );

        return {
            formattedInput,
            formatInput
        };
    }
};
</script>