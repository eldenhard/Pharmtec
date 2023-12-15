<template>
    <form class="autorization_form">
        <p class="enter">Войти</p>
        <InputComponent :labelValue="'Email / логин'"/>
        <InputComponent :labelValue="'Пароль'"/>
        <buttonComponent>Войти</buttonComponent>
    </form>
</template>

<style>
@import './style/form_autorization_style.scss'

</style>

<script>
import buttonComponent from '../../ui/button/buttonComponent.vue';
import InputComponent from '../../ui/inputComponent/InputComponent.vue';
export default {
    components: { buttonComponent, InputComponent },
    setup() {

    },
}
</script>