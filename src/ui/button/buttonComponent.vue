<template>
    <button :disabled="disabledButton">
        <slot></slot>
    </button>
</template>



<script>
export default {
    props: {
        disabledButton: {
            type: Boolean
        }
    },
    setup() {
        
    },
}
</script>

<style scoped>

@import './style/buttonstyle.scss';
</style>