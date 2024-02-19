<template>
    <section class="air_block">
        <p class="header_element">Заявка на регистрацию</p>
        <hr>
        <form @submit.prevent="createApplicationForManager($event.target)">
            <section class="first_line">
                <div class="input-box">
                    <label>Фамилия</label>
                    <input type="text" v-model="formData.last_name" name="last_name" required>
                </div>
                <div class="input-box">
                    <label>Имя</label>
                    <input v-model="formData.first_name" type="text" name="first_name" required>
                </div>
                <div class="input-box">
                    <label>Отчество</label>
                    <input type="text" v-model="formData.middle_name" name="middle_name">
                </div>
                <div class="input-box">
                    <label style="background: white !important; position: absolute; z-index:1 ;">Регион</label>
                    <v-select v-model="formData.region_pre" :options="allRegion" label="value" required />
                </div>
                <div class="input-box">
                    <label>Почта</label>
                    <input type="email" v-model="formData.email" name="email" required>
                </div>
                <div class="input-box">
                    <label>Телефон</label>
                    <input v-mask="'+7 (###) ###-##-##'" v-model="formData.phone" name="phone" required />
                </div>
            </section>

            <div class="input-box" style="margin-top: 2vh;">
                <label style="background: white !important; position: absolute; z-index:1;">Руководитель</label>
                <v-select v-model="formData.manager_pre" :options="allUsers" label="full_name" required />
            </div>


            <!-- <label for="" class="department">
                Должность <br>
                <v-select :options="department" label="title" />
            </label> -->
            <buttonComponent type="submit" style="width: 100%;">Зарегистрировать</buttonComponent>
        </form>
    </section>
</template>




<script>
import { reactive, ref, onMounted, watch } from 'vue'
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import buttonComponent from '../../ui/button/buttonComponent.vue';
import { useToast } from "vue-toastification";
import api from '@/api/user'
import apiInvite from '@/api/invites'
import { mask } from 'vue-the-mask'
import { useLoaderStore } from '../../store/LoaderStore';
import { refreshToken } from '@/mixins/refreshToken'

export default {
    components: { InputComponent, buttonComponent },
    directives: { mask },
    setup() {
        const formData = ref({
            last_name: '',
            first_name: '',
            middle_name: '',
            email: '',
            phone: '',
            manager_pre: '',
            region_pre: '',
        })
        const toast = useToast()
        const allUsers = ref([])
        const allRegion = reactive([{ value: 'Москва' }, { value: 'Дальний Восток' }, { value: "Смоленск +" }, { value: "Центр" }, { value: "Юг" }, { value: 'Западная Сибирь' }, { value: 'Северо-Запад' }, { value: 'Волга' }, { value: 'Урал' }].sort((a, b) => a.value.localeCompare(b.value)))
        const createApplicationForManager = async (e) => {
            formData.value.manager = formData.value.manager_pre.id
            formData.value.region = formData.value.region_pre.value
            try {
                let response = await apiInvite.createNewInvite(formData.value)
                toast.success('Успешно! По указанному адресу отправлено письмо для входа', {
                    timeout: 3000
                })
            } catch (err) {
                console.log(err)
  
            } finally {

            }

        }
   
        onMounted(async () => {
            useLoaderStore().setLoader(true)
            await refreshToken()
            try {
                let response = await api.getAllUsers()
                allUsers.value = response.data.reduce((acc, el) => {
                    let full_name = `${el.last_name} ${el.first_name} ${el.middle_name}`
                    return [...acc, { ...el, full_name }]
                }, []).sort((a, b) => a.full_name.localeCompare(b.full_name))
            } catch (err) {
                console.log(err)
            } finally {
                useLoaderStore().setLoader(false)
            }
        })


        return {
            toast,
            formData,
            allUsers,
            allRegion,
            createApplicationForManager
        }
    },
}
</script>

<style scoped>
@import './style/for_manager_style.scss';
</style>