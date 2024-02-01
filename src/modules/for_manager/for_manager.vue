<template>
    <section class="air_block">
        <p class="header_element">Заявка на регистрацию</p>
        <hr>
        <div class="first_line">
            <div class="date_start">
                <InputComponent :labelValue="'Дата начала'" :typeInput="'date'" @update:modelValue="start_date = $event"
                    reqired />
            </div>

            <label for="" class="manager">
                Руководитель <br>
                <v-select :options="books" label="title" />
            </label>

            <label for="" class="department">
                Должность <br>
                <v-select :options="books" label="title" />
            </label>

            <label for="" class="position">
                Подраздление <br>
                <v-select :options="books" label="title" />
            </label>


            <label for="" class="region">Регион <br>
                <select style="width: 100%;">
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </label>

          
        </div>
        <buttonComponent style="width: 100%;">Создать</buttonComponent>
    </section>
</template>




<script>
import { reactive, ref } from 'vue'
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import buttonComponent from '../../ui/button/buttonComponent.vue';
export default {
    components: { InputComponent, buttonComponent },
    setup() {
        let books = reactive([
            { title: "Old Man's War" },
            { title: "The Lock Artist" },
            { title: "HTML5" },
            { title: "Right Ho Jeeves" },
            { title: "The Code of the Wooster" },
            { title: "Thank You Jeeves" }
        ])
        const start_date = ref("")


        return {
            books,
            start_date
        }
    },
}
</script>

<style scoped>
@import './style/for_manager_style.scss';
</style>