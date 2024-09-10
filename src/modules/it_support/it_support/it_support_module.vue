<template>
    <div class="container">
        <div class="form form-stacked">
            <div class="form-block">
                <label class="label" for="board_content">Заявка для IT службы</label>
                <section class="form_controls">

                    <Form @submit="sendQuestionsToITSupport">
                        <div class="form_controls_body">
                            <label for="" style="width: 100%;">
                                Компания <br>
                                <v-select :options="companies" title="Select an item" />
                            </label>
                            <label for="" style="width: 100%;">
                                ФИО <br>
                                <v-select :options="all_users" label="full_name" />
                            </label>
                            <label for="" style="width: 100%;">
                                Должность <br>
                                <v-select :options="jobsName" />
                            </label>
                            <label for="" style="width: 100%;">
                                Телефон <br>
                                <input type="text" v-mask="'+7 (###) ###-##-##'">
                            </label>
                            <!-- <InputComponent v-mask="'+7 (###) ###-##-##'" :labelValue="'Телефон'" /> -->
                            <textarea placeholder="Опишите проблему" class="textarea-tall" id="board_content"
                                v-model="board_problem"></textarea>
                            <textarea placeholder="Опишите задачу, что не обходимо сделать" class="textarea-tall"
                                id="board_content2" v-model="board_task"></textarea>
                            <dropZone class="full-width"/>
                        </div>
                        <buttonComponentVue type="submit" :disabled="is_disabled_button">Отправить запрос
                        </buttonComponentVue>
                    </Form>
                </section>
            </div>

        </div>
    </div>
</template>

<style scoped>
@import './style/it_support_styles.scss';
</style>

<script setup lang="ts">
import buttonComponentVue from "../../../ui/button/buttonComponent.vue";
import InputComponent from "../../../ui/inputComponent/InputComponent.vue";
import dropZone from "../../drop_zone/drop_zone.vue";
import { useToast } from "vue-toastification";
import { ref, watch, reactive, onMounted, computed } from 'vue'
import { mask } from "vue-the-mask";
import { useGetAllUsers } from "../../../store/AllUsers";
import { Form, Field } from 'vee-validate'
import { all } from "axios";

const toast = useToast()
const is_disabled_button = ref<boolean>(true)
const board_problem = ref<string>("")
const board_task = ref<string>("")
const companies: string[] = ['Фармтек', 'Интелбио']
const all_users = useGetAllUsers().all_users

onMounted(() => {
    console.log('все пользователи', all_users)
})

const jobsName = computed(() => {
    let data = all_users.map((user) => user.job_info.name)
    return Array.from(new Set(data)).sort((a, b) => a.localeCompare(b))
})


const sendQuestionsToITSupport = () => {

    toast.info('Раздел в разработке. Запрос не отправлен', {
        timeout: 3000
    })

}
</script>