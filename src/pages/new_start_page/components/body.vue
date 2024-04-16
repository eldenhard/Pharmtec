<template>
    <div class="body_start_page">
        <news_block />
        <hot_key />
    </div>
</template>

<script>
import news_block from '../modules/news_block.vue'
import hot_key from '../modules/hot_key.vue'
export default {
    components: {
        news_block,
        hot_key
    },
    setup() {
        
    },
}
</script>

<style  scoped>
@import '@/pages/new_start_page/style/style_body_elements.scss';


</style>