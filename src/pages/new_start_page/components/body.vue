<template>
    <div class="body_start_page">
        <news_block />

    </div>
</template>

<script>
import news_block from '../modules/news_block.vue'
export default {
    components: {
        news_block
    },
    setup() {
        
    },
}
</script>

<style  scoped>
@import '@/pages/new_start_page/style/style_body_elements.scss';


</style>