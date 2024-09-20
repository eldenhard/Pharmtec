<template>
  <div class="link_el">
    <i
      class="bi bi-arrow-up-right-circle-fill"
      :class="[
        'bi bi-arrow-up-right-circle-fill', // Всегда добавляем базовый класс 'bi'
        typeActive ? 'hover_el' : '', // Добавляем класс при наведении
        isActive ? 'active' : '', // Добавляем класс для активного состояния
      ]"
      @mouseover="handleMouseOver"
      @mouseout="handleMouseOut"
      @click="handleClick"
    ></i>
   
  </div>
</template>


<script>
import { ref,watch } from "vue";

export default {
  props: ["hovered"],
  setup(props) {
    const isLike = ref(false);
    const isActive = ref(false);
    const isHovered = ref(false);
    const typeActive = ref(props.hovered);

    // Следим за изменением пропса hovered и обновляем typeActive
    watch(() => props.hovered, (newVal) => {
        typeActive.value = newVal;
      }
    );
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
      handleClick,
      typeActive,
    };
  },
};
</script>


<style scoped>
/* Стили для активного состояния */
.active {
  color: #528c0d;
  /* Цвет для активного состояния или заполненного сердца */
}

.hover_el {
  color: #61a60e;
  /* Цвет при наведении */
}

.bi {
  cursor: pointer;
  font-size: 2rem;
  /* Изменяем курсор для иконки */
}
</style>