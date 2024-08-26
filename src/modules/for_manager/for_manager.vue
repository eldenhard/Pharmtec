<template>
    <section class="air_block">
       
        <section  class="header_element">
            <span class="description">Заявка на регистрацию</span>
        </section>
        <hr>
        <form @submit.prevent="createApplicationForManager($event.target)">
            <section class="grid_row">
                <div>
                    <drop_zone_img reqired/>
                </div>
                <div class="first_line">
                    <div class="input-box">
                        <label>Фамилия</label>
                        <input type="search" v-model="formData.last_name" name="last_name" required>
                    </div>
                    <div class="input-box">
                        <label>Имя</label>
                        <input v-model="formData.first_name" type="search" name="first_name" required>
                    </div>
                    <div class="input-box">
                        <label>Отчество</label>
                        <input type="search" v-model="formData.middle_name" name="middle_name">
                    </div>

                    <div class="input-box">
                        <label>Фамилия прошлого сотрудника</label>
                        <input type="search" >
                    </div>
                    <div class="input-box">
                        <label>Имя прошлого сотрудника</label>
                        <input  type="search"  >
                    </div>
                    <div class="input-box">
                        <label>Отчество прошлого сотрудника</label>
                        <input type="search" >
                    </div>

                    <div class="input-box">
                        <label>Должность</label>
                        <input type="search" >
                    </div>
                    <div class="input-box">
                        <label>Город</label>
                        <input type="search" >
                    </div>

                    <div class="input-box">
                        <label style="background: white !important; position: absolute; z-index:1 ;">Регион</label>
                        <v-select v-model="formData.region_pre" :options="allRegion" label="value" required />
                    </div>

                    <div class="input-box">
                        <label>Дата выхода</label>
                        <input type="date" v-model="formData.date_start_work" name="date_start_work" required>
                    </div>

                    <div class="input-box">
                        <label>Направление продвижения</label>
                        <input type="search" >
                    </div>

                    <div class="input-box">
                        <label>Электронный адрес</label>
                        <input type="email" v-model="formData.email" name="email" required>
                    </div>

                    <div class="input-box">
                        <label>Телефон</label>
                        <input v-mask="'+7 (###) ###-##-##'" v-model="formData.phone" name="phone" required />
                    </div>


                    <div class="input-box">
                        <label>Адрес для промматериалов</label>
                        <input type="search" >
                    </div>
                    <div class="input-box">
                        <label>Адрес для СДЕК</label>
                        <input type="search" >
                    </div>
                    <div class="input-box">
                        <label>Дата рождения</label>
                        <input type="date" v-model="formData.date_of_birth" name="email" required>
                    </div>
                    <div class="input-box">
                        <label style="background: white !important; position: absolute; z-index:1;">Руководитель</label>
                        <v-select v-model="formData.manager_pre" :options="allUsers" label="full_name" required />
                    </div>
                    <div class="input-box">
                        <label>Доп. информация</label>
                        <input type="search" >
                    </div>
                  
             
                 
               
                </div>
            </section>



            <!-- <label for="" class="department">
                Должность <br>
                <v-select :options="department" label="title" />
            </label> -->
            <buttonComponent type="submit" style="width: 100%;">Зарегистрировать</buttonComponent>
        </form>
    </section>
</template>




<script lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import buttonComponent from '../../ui/button/buttonComponent.vue';
import { useToast } from "vue-toastification";
import api from '@/api/user'
import apiInvite from '@/api/invites'
import { mask } from 'vue-the-mask'
import { useLoaderStore } from '../../store/LoaderStore';
import { refreshToken } from '@/mixins/refreshToken'
import drop_zone_img from './modules/drop_zone_img.vue';
import { string } from 'yup';
export default {
    components: { InputComponent, buttonComponent, drop_zone_img },
    directives: { mask },
    setup() {
        interface FormData {
            last_name: string,
            first_name: string,
            middle_name: string,
            email: string,
            phone: string,
            manager_pre: string | number,
            region_pre: string,
            date_of_birth: string,
            // дата начала работы
            date_start_work: string,
            manager: string,
            region: string,
        }
        const formData = ref<FormData>({
            last_name: '',
            first_name: '',
            middle_name: '',
            email: '',
            phone: '',
            manager_pre: '',
            region_pre: '',
            date_of_birth: '',
            // дата начала работы
            date_start_work: '',
            manager: "",
            region: "",
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
                // Очистить значение formData.value после отправки
                for (let i in formData.value) {
                    formData.value[i] = ''
                }

            } catch (err) {
                toast.error('Приглашение с таким Email уже существует.', {
                    timeout: 3000
                })

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