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
                <v-select :options="manager" label="title" dir="ltr">
                    <slot name="no-options">Извините, данные не найдены</slot>
                </v-select>
       
            </label>

            <label for="" class="department">
                Должность <br>
                <v-select :options="department" label="title" />
            </label>

            <label for="" class="position">
                Подраздление <br>
                <v-select :options="position" label="title" />
            </label>


            <label for="" class="region">Регион <br>
                <select style="width: 100%;">
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </label>


        </div>
        <buttonComponent style="width: 100%;" @click="createApplicationForManager()">Создать</buttonComponent>
    </section>
</template>




<script>
import { reactive, ref } from 'vue'
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import buttonComponent from '../../ui/button/buttonComponent.vue';
import { useToast } from "vue-toastification";
export default {
    components: { InputComponent, buttonComponent },
    setup() {
        let manager = reactive([])
        let department = reactive([
            { title: "Медицинский представитель" },
            { title: "Менеджер по работе с ключевыми клиентами" },
            { title: "Супервайзер" },
            { title: "Старший медицинский представитель" },
            { title: "Менеджер по продвижению продуктов" },
            { title: "Медицинский советник" },
            { title: "Менеджер по эффективности" },
            { title: "Менеджер-координатор" },
            { title: "Бухгалтер" },
            { title: "Кладовщик" },
            { title: "WEB-программист" },
            { title: "Торговый представитель" },
            { title: "Младший менеджер по продвижению продуктов" },
            { title: "Водитель" },
            { title: "Менеджер по маркетинговым коммуникациям" },
            { title: "Менеджер по проектам" },
            { title: "Старший менеджер по работе с аптечными сетями" },
            { title: "Ассистент отдела маркетинга" },
            { title: "Генеральный директор" },
            { title: "Директор по продажам" },
            { title: "Заместитель генерального директора" },
            { title: "Директор по персоналу" },
            { title: "Региональный менеджер" },
            { title: "Коммерческий директор" },
            { title: "Медицинский директор" },
            { title: "Директор по развитию" },
            { title: "Руководитель отдела по работе с аптечными сетями" },
            { title: "Директор по работе с аптечными сетями" },
            { title: "Консультант" },
        ])
        const start_date = ref("")
        const position = reactive([])
        const toast = useToast()
        const createApplicationForManager = () => {
            toast.info('Раздел в разработке. Создание невозможно!', {
                timeout: 3000
            })
        }

        return {
            position,
            department,
            manager,
            start_date,
            toast,
            createApplicationForManager
        }
    },
}
</script>

<style scoped>
@import './style/for_manager_style.scss';
</style>