<!-- <template>
    <div>
        <i class="bi bi-suit-heart heart_el" :class="{bi-suit-heart-fill: isLike}"></i>
    </div>
</template>


<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>
.heart_el{
    color: #14949C;
    font-size: 1rem;
    vertical-align: middle !important;

  

}
.bi::before{
    vertical-align: 0 !important;
}
.heart_el:hover{
    fill: blue; /* Заливка для линий иконки */
  stroke-width: 2px; /* Толщина линий иконки */
}
</style> -->
<template>
    <div>
      <!-- Используем массив классов -->
      <i
        :class="[
          'bi', // Всегда добавляем базовый класс 'bi'
          isLike || isHovered ? 'bi-suit-heart-fill' : 'bi-suit-heart', // Выбираем класс для заполнения сердца или обычного сердца
          isHovered ? 'hover_el' : '', // Добавляем класс при наведении
          isActive ? 'active' : '' // Добавляем класс для активного состояния
        ]"
        @mouseover="handleMouseOver"
        @mouseout="handleMouseOut"
        @click="handleClick"
      ></i>
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
  
  <style>
  /* Стили для активного состояния */
  .active,
  .bi-suit-heart-fill {
    color: #14949c; /* Цвет для активного состояния или заполненного сердца */
  }
  .bi{
    color: #14949c;
    font-size: 1.2rem;
  }
  .hover_el {
    color: #D2D2D2; /* Цвет при наведении */
  }
  
  .bi {
    cursor: pointer; /* Изменяем курсор для иконки */
  }
  </style>
  