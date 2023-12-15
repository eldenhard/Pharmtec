<template>
    <form class="autorization_form">
        <p class="enter">Войти</p>
        <InputComponent v-model="emailInput" :labelValue="'Email / логин'" :typeInput="'text'" />
        <InputComponent v-model="passwordInput" :labelValue="'Пароль'" :typeInput="'password'" />
        <buttonComponent :disabledButton="disabledButton">Войти</buttonComponent>
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

        watch([emailInput, passwordInput], () => {
            disabledButton.value = emailInput.value.trim() === '' || passwordInput.value.trim() === '';
        });

        return {
            disabledButton,
            emailInput,
            passwordInput,
        };
    },
};
</script>

<style>
@import './style/form_autorization_style.scss';
</style>

