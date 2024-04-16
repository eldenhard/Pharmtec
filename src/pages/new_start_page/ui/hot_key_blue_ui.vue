<template>
    <div class="hot_key">
        <div class="ui_el">
            <slot></slot>
        </div>
        <div class="blue_circle"></div>
    </div>
</template>

<style scoped>
.hot_key {
    position: relative;
    border-radius: 25%;
    width: 5vw;
    height: 5vw;
    background: linear-gradient(to bottom, #1BAEB7, #015C8E);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

}

.ui_el {
    /* Остальные стили для вашего внутреннего контента */
}

.blue_circle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5vw;
    height: 5vw;
    background-color: #47A0D0;
    border-radius: 50%;
    transform: translate(-30%, 50%);
}
</style>
