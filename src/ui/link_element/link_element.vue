<template>
    <div class="link_el">
        <i class="bi bi-arrow-up-right-circle-fill" :class="[
            'bi bi-arrow-up-right-circle-fill', // Всегда добавляем базовый класс 'bi'
            isHovered ? 'hover_el' : '', // Добавляем класс при наведении
            isActive ? 'active' : '' // Добавляем класс для активного состояния
        ]" @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick"></i>

    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    setup() {
        const isLike = ref(false);
        const isActive = ref(false);
        const isHovered = ref(false);

        const handleMouseOver = () => {
            isHovered.value = true;
        };

        const handleMouseOut = () => {
            isHovered.value = false;
        };

        const handleClick = () => {
            isLike.value = !isLike.value;
            isActive.value = !isActive.value;
        };

        return {
            isLike,
            isActive,
            isHovered,
            handleMouseOver,
            handleMouseOut,
            handleClick
        };
    }
};
</script>
<style scoped>
/* Стили для активного состояния */
.active {
    color: #528C0D;
    /* Цвет для активного состояния или заполненного сердца */
}

.hover_el {
    color: #61A60E;
    /* Цвет при наведении */
}

.bi {
    cursor: pointer;
    font-size: 2rem;
    /* Изменяем курсор для иконки */
}
</style>