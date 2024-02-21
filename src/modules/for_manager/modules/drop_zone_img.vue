<template>
    <div class="drop-zone"  @dragover.prevent @drop="handleDrop">
        <input ref="fileInput" type="file" style="display: none;" accept="image/*" @change="handleFileInputChange" />
        <div v-if="imageUrl" class="preview-container">
            <img :src="imageUrl" alt="Preview" class="preview-image" />
        </div>
        <div v-else class="instruction">
            Перетащите изображение сюда.
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
    setup() {
        const imageUrl = ref('');
        const drop_zone_success = ref(false);
        const handleFileInputChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                imageUrl.value = URL.createObjectURL(file);
            }
        };

        const handleDrop = (event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file) {
                drop_zone_success.value = true
                imageUrl.value = URL.createObjectURL(file);
            }
        };

        return {
            imageUrl,
            handleFileInputChange,
            handleDrop,
        };
    },
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