<template>
    <button :disabled="disabledButton">
        <slot></slot>
    </button>
</template>


<style scoped>
@import './style/buttonstyle.scss'
</style>
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