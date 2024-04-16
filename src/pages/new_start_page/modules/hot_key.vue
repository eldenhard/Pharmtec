<template>
    <div class="hot_keys_group">
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>
        <hot_key_blue ><i class="bi bi-circle"></i></hot_key_blue>

    </div>
</template>


<script>
import hot_key_blue from '../ui/hot_key_blue_ui.vue'
export default {
    components: {
        hot_key_blue
    },
    setup() {
        
    },
}
</script>

<style scoped>
.hot_keys_group{
    margin-top: 6%;
    justify-items: center;

    display: grid;
    grid-template-rows: 1fr 1fr;
    row-gap:8vh;
    grid-template-columns: repeat(6, 1fr);
}
</style>