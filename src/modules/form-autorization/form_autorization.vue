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
export default {
    components: { buttonComponent, InputComponent },
    setup() {
        const disabledButton = ref(true);
        const emailInput = ref('');
        const passwordInput = ref('');
        const emailInputRegistration = ref('')
        const passwordInputRegistration = ref('')
        // Обработка активности кнопки
        watch([emailInput, passwordInput], () => {
            disabledButton.value = emailInput.value.trim() === '' || passwordInput.value.trim() === '';
        });
        const setTokenUser = (event) => {
            event.preventDefault()
            api.getUserJWTToken(emailInput.value, passwordInput.value)
                .then(response => {
                    console.log(response)
                    localStorage.setItem('token', passwordInput)
                    window.location.href = '/'
                }).catch((err) => {
                    console.err(err)
                    localStorage.setItem('token', passwordInput)
                    window.location.href = '/'
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

