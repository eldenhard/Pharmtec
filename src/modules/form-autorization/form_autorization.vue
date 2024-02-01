<template>
    <div class="reg_block">
        <ul class="nav nav-pills mb-3 form" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                    type="button" role="tab" aria-controls="pills-home" aria-selected="true">Вход</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                    type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Регистрация</button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <form class="autorization_form">
                    <p class="enter">Войти</p>
                    <InputComponent v-model="emailInput" :labelValue="'Email / логин'" :typeInput="'text'" />
                    <InputComponent v-model="passwordInput" :labelValue="'Пароль'" :typeInput="'password'" />
                    <buttonComponent :disabledButton="disabledButton" @click="setTokenUser">Войти</buttonComponent>
                </form>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <form class="autorization_form">
                    <p class="enter">Регистрация</p>
                    <InputComponent v-model="emailInputRegistration" :labelValue="'Email / логин'" :typeInput="'text'" />
                    <InputComponent v-model="passwordInputRegistration" :labelValue="'Пароль'" :typeInput="'password'" />
                    <buttonComponent :disabledButton="disabledButton">Регистрация</buttonComponent>
                </form>
            </div>

        </div>



    </div>
</template>
  
<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import { ref, watch } from 'vue';
import api from '../../api/user'
import { useToast } from "vue-toastification";
import { useLoaderStore } from '../../store/LoaderStore'

export default {
    components: { buttonComponent, InputComponent },
    setup() {

        const toast = useToast();
        const disabledButton = ref(true);
        const emailInput = ref('');
        const passwordInput = ref('');
        const emailInputRegistration = ref('')
        const passwordInputRegistration = ref('')
        // Обработка активности кнопки
        watch([emailInput, passwordInput], () => {
            disabledButton.value = emailInput.value.trim() === '' || passwordInput.value.trim() === '';
        });
        let setTokenUser = (event) => {
            useLoaderStore().setLoader(true)
            event.preventDefault()
            let objEnter = {
                username: emailInput.value,
                password: passwordInput.value
            }
            // console.log(objEnter)
            // window.location.href = '/'
            api.getUserJWTToken(objEnter)
                .then((response) => {
                    localStorage.setItem('accessToken', JSON.stringify(response.data.access))
                    window.location.href = '/'
                    useLoaderStore().setLoader(false)
                }).catch((err) => {
                    console.log(err)
                    useLoaderStore().setLoader(false)
                    toast.error(`Ошибка! Пользователь не найден`, {
                        timeout: 3000
                    })
                })



        }
        return {

            disabledButton,
            emailInput,
            passwordInput,
            emailInputRegistration,
            passwordInputRegistration,
            // functions
            setTokenUser,

        };
    },
};
</script>

<style scoped>
@import './style/form_autorization_style.scss';
</style>

