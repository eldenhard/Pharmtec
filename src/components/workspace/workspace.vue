<template>
    <div class="workspace" >
        <slot></slot>
    </div>
</template>


<style scoped>
.workspace {
    /* width: 100%; max-height: 90vh; overflow-y: auto; */
}
@media screen and (max-width: 950px){ 
    .workspace{
        width: 100vw;
        height: auto;
        min-height: 100vh;
    }
}
</style>