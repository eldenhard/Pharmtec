<template>
    <form class="autorization_form">
        <p class="enter">Войти</p>
        <InputComponent v-model="emailInput" :labelValue="'Email / логин'" :typeInput="'text'" />
        <InputComponent v-model="passwordInput" :labelValue="'Пароль'" :typeInput="'password'" />
        <buttonComponent :disabledButton="disabledButton" @click="setTokenUser">Войти</buttonComponent>
    </form>
</template>
  
<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
import { ref, watch } from 'vue';

export default {
    components: { buttonComponent, InputComponent },
    setup() {
        const disabledButton = ref(true);
        const emailInput = ref('');
        const passwordInput = ref('');
        // Обработка активности кнопки
        watch([emailInput, passwordInput], () => {
            disabledButton.value = emailInput.value.trim() === '' || passwordInput.value.trim() === '';
        });
        const setTokenUser = (event) => {
            event.preventDefault()
            localStorage.setItem('token', passwordInput)
            window.location.href = '/'
        }
        return {
            disabledButton,
            emailInput,
            passwordInput,
            setTokenUser,
        };
    },
};
</script>

<style scoped>
@import './style/form_autorization_style.scss';
</style>

