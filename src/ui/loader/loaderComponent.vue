<template>
    <div class="wrapper" v-if="loader">
        <div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useLoaderStore } from '../../store/LoaderStore'
export default {
    setup() {
        const store = useLoaderStore()
        const loader = ref(useLoaderStore.actions)
        watch(() => store.loader, (newValue) => {
            loader.value = newValue
        })
        return{
            loader
        }
    },
}
</script>

<style scoped>
@import './style/loaderStyle.scss';
</style>