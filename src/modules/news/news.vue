<template>
    <section class="air_block">
        <p class="header_element">Создание новости</p>
        <hr>
        <v-md-editor v-model="text" height="400px"></v-md-editor>

        <buttonComponentVue @click="createNewNews()">Создать новость</buttonComponentVue>
    </section>
</template>




<script>
import { ref } from 'vue'
import buttonComponentVue from '../../ui/button/buttonComponent.vue'
import { useToast } from "vue-toastification";
export default {
    components: { buttonComponentVue },
    setup() {
        const text = ref("")
        const toast = useToast()
        const createNewNews = () => {
            toast.info('Раздел в разработке. Создание невозможно', {
                timeout: 3000
            })
            console.log(text.value)
        }
        return {
            text,
            toast,
            // function
            createNewNews
        }
    },
}
</script>
<style scoped>
@import './style/newsStyle.scss';
</style>