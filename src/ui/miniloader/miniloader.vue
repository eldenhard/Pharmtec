<template>
    <div class="wrapper" v-if="isActiveMiniLoader">
        
        <span class="loader"></span>
    </div>
</template>

<script>
export default {
    props: {
        isActiveMiniLoader: {
            type: Boolean,
            defaule: false
        }
    },
    setup() {
        
    },
}
</script>

<style scoped>
@import './assets/miniloader.scss'
</style>