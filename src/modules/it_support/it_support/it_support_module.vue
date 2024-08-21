<template>
    <div class="container">
        <div class="form form-stacked">
            <div class="form-block">
                <label class="label" for="board_content">Заявка для IT службы</label>
                <div class="form-controls">
                    <span class="button ion-code" title="Code block <pre><code>" data-button-type="addCode"></span>
                    <span class="button ion-code-working" title="Inline code <code>"
                        data-button-type="addInlineCode"></span>
                    <span class="button ion-link" title="Link <a>" data-button-type="addLink"></span>
                    <span class="button ion-social-codepen-outline" title="Embed CodePen pen"
                        data-button-type="embedCodePen"></span>
                </div>
                <textarea placeholder="Задайте свой вопрос..." class="textarea-tall" id="board_content"
                    v-model="board_content"></textarea>
                <buttonComponentVue @click="sendRequest()" :disabled="is_disabled_button">Отправить запрос
                </buttonComponentVue>
            </div>

        </div>
    </div>
</template>

<style scoped>
@import './style/it_support_styles.scss';
</style>

<script setup>
import buttonComponentVue from "../../../ui/button/buttonComponent.vue";
import { useToast } from "vue-toastification";
import { ref, watch } from 'vue'
const toast = useToast()
const is_disabled_button = ref(true)
const board_content = ref("")


watch(board_content, () => {
    if (board_content.value.length > 0) {
        is_disabled_button.value = false
    }
})
const sendRequest = () => {

        toast.info('Раздел в разработке. Запрос не отправлен', {
            timeout: 3000
        })
    
}
</script>