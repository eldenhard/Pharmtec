<template>
    <div class="main">
        <div class="dropzone-container" :style="isDragging && 'border-color: green;'" @dragover="dragover"
            @dragleave="dragleave" @drop="drop">
            <input type="file" multiple name="file" id="fileInput" class="hidden-input" @change="onChange(e)" ref="file"
                accept=".pdf,.jpg,.jpeg,.png" />

            <label for="fileInput" class="file-label">
                <div v-if="isDragging">Отпустите, чтобы переместить файлы.</div>
                <div v-else>Перетащите файлы или <u>нажмите здесь</u>, чтобы загрузить.</div>
            </label>
            <!-- Note: Only add the code block below -->
            <div class="preview-container mt-4" v-if="files.length">
                <div v-for="file in files" :key="file.name" class="preview-card">
                    <div style="display: flex; flex-wrap: wrap;">
                        <img class="preview-img" :src="generateURL(file)" />
                        <p >
                            {{ file.name }} -
                            {{ Math.round(file.size / 1000) + "kb" }}
                        </p>
                    </div>
                    <div>
                        <button class="ml-2" type="button" @click="remove(files.indexOf(file))" title="Remove file">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DC3545"
                                class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
@import './assets/drop_zone.scss';
</style>

<script>
export default {
    data() {
        return {
            isDragging: false,
            files: [],
        };
    },
    methods: {
        remove(i) {
            this.files.splice(i, 1);
        },
        onChange(e) {
            this.files.push(...this.$refs.file.files);
            this.$emit('downloadFile',  this.files )
        },
        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.onChange(e);
           
           
            this.isDragging = false;
        },
        generateURL(file) {
            let fileSrc = URL.createObjectURL(file);
            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);
            return fileSrc;
        },
    },
};
</script>