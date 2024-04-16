<template>
    <div style="display: flex; flex-direction: column;">
        <!-- <navbar /> -->
        <body_component />
        <footer_component />
    </div>
</template>


<script>
// import navbar from './components/navbar.vue';
import body_component from './components/body.vue'
import footer_component from './components/footer.vue'

export default {
    components: { body_component, footer_component },
    setup() {
        
    },
}
</script>