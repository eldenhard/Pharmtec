<template>
    <div>
        <!-- <navbar /> -->
        <body_component />
        <footer />
    </div>
</template>


<script>
// import navbar from './components/navbar.vue';
import body_component from './components/body.vue'
import footer from './components/footer.vue'

export default {
    components: { body_component, footer },
    setup() {
        
    },
}
</script>