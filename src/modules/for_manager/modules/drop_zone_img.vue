<template>
    <div class="drop-zone" @click="triggerFileInput" @dragover.prevent @drop="handleDrop">
      <input ref="fileInput" type="file" style="display: none;" accept="image/*" @change="handleFileInputChange" />
      
      <!-- Если изображение уже загружено, отображаем превью -->
      <div v-if="imageUrl" class="preview-container">
        <img :src="imageUrl" alt="Preview" class="preview-image" />
      </div>
      
      <!-- Если изображения нет, отображаем инструкцию -->
      <div v-else class="instruction">
        Перетащите изображение сюда или кликните для выбора.
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      modelValue: {
        type: File, // Ожидаем объект File для изображения
        default: null
      }
    },
    setup(props, { emit }) {
      const imageUrl = ref('');
      const fileInput = ref(null);
  
      // Когда файл изменяется, передаем его в родительский компонент
      const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          imageUrl.value = URL.createObjectURL(file);
          emit('update:modelValue', file); // Передаем файл через v-model
        }
      };
  
      // Обработчик для перетаскивания файла
      const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
          imageUrl.value = URL.createObjectURL(file);
          emit('update:modelValue', file); // Передаем файл через v-model
        }
      };
  
      // Триггер для открытия диалога выбора файла
      const triggerFileInput = () => {
        fileInput.value.click();
      };
  
      // Следим за изменениями modelValue для обновления изображения
      watch(() => props.modelValue, (newValue) => {
        if (newValue) {
          imageUrl.value = URL.createObjectURL(newValue);
        }
      });
  
      return {
        imageUrl,
        handleFileInputChange,
        handleDrop,
        triggerFileInput,
        fileInput
      };
    }
  };
  </script>
  
  <style scoped>
  .drop-zone {
    width: 80%;
    height: 35vh;
    border: 2px dashed #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .preview-container {
    width: 100%;
    height: 100%;
  }
  
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .instruction {
    text-align: center;
  }
  </style>
  