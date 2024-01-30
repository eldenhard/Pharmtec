<template>
    <button :disabled="disabledButton" :type="typeButton">
        <slot></slot>
    </button>
</template>



<script>
export default {
    props: {
        disabledButton: {
            type: Boolean
        },
        typeButton: {
            type: String,
            default: 'button'
        }
    },
    setup() {
        
    },
}
</script>

<style scoped>

@import './style/buttonstyle.scss';
</style>