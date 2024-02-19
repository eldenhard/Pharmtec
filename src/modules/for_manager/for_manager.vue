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
                    <input type="text" v-model="formData.middle_name" name="middle_name" >
                </div>
                <div class="input-box">
                    <label>Регион</label>
                    <input type="text" v-model="formData.region" name="region" required>
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
            <label>Руководитель</label>  
            <div  style="margin-top: 2%; ">
                <v-select v-model="formData.manager" :options="allUsers" label="full_name" placeholder="Руководитель" required/>
               
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
import { reactive, ref, onMounted } from 'vue'
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import buttonComponent from '../../ui/button/buttonComponent.vue';
import { useToast } from "vue-toastification";
import api from '@/api/user'
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
            manager: '',
            region: '',
        })

        const toast = useToast()
        const allUsers = ref([])
        const createApplicationForManager = (e) => {
            console.log(formData.value.last)
            toast.info('Письмо авторизации отправлено на указанную вами почту', {
                timeout: 3000
            })
        }
        onMounted(async () => {
            useLoaderStore().setLoader(true)
            await refreshToken()
            try {
                let response = await api.getAllUsers()
                allUsers.value = response.data.reduce((acc, el) => {
                    let full_name = `${el.last_name} ${el.first_name} ${el.middle_name}`
                    return [...acc, { ...el, full_name }]
                }, [])
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
            createApplicationForManager
        }
    },
}
</script>

<style scoped>
@import './style/for_manager_style.scss';
</style>