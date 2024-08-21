<template>
   <div class="container">
  <div class="form form-stacked">
    <div class="form-block">
      <label class="label" for="board_content">Заявка для IT службы</label>
      <div class="form-controls">
        <span class="button ion-code" title="Code block <pre><code>" data-button-type="addCode"></span>
        <span class="button ion-code-working" title="Inline code <code>" data-button-type="addInlineCode"></span>
        <span class="button ion-link" title="Link <a>" data-button-type="addLink"></span>
        <span class="button ion-social-codepen-outline" title="Embed CodePen pen" data-button-type="embedCodePen"></span>
      </div>
      <textarea placeholder="Задайте свой вопрос..." class="textarea-tall" id="board_content"></textarea>
      <buttonComponentVue>ОТправить запрос</buttonComponentVue>
    </div>
  
  </div>
</div>
</template>

<style scoped>
@import './style/it_support_styles.scss';
</style>

<script setup>
import buttonComponentVue from "../../../ui/button/buttonComponent.vue";

</script>