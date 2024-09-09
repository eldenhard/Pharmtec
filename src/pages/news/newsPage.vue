<template>
    <div>
        <news_block />
        <div style="display: flex; justify-content: space-between; width: 80%; margin: 0 auto; align-items: center;">
            <pagination_module />
            <a>Показать ещё</a>
        </div>
    </div>
</template>


<script lang="ts" setup>
import news_block from "./modules/news_block.vue"
import pagination_module from "./modules/pagination_module.vue"
</script>
<style scoped>
@media screen and (max-width: 768px) {

    div>a {
        display: none;
    }
}
</style>